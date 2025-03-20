import { Box } from "@/app/components/ui/box";
import { LeftArea, LeftAreaProps } from "./left-area";
import { Post, Tag } from "./types";
import { RightArea } from "./right-area";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post as RawPost } from "@/app/hooks/usePosts";
import { useEffect, useMemo, useState, memo } from "react";
import { useLocation } from "react-router";

const LeftAreaMemo = memo<LeftAreaProps>(LeftArea);

const TechPosts = () => {
  const { isDesktop } = useMediaQuery();
  const { fetchPosts } = useFindPosts();
  const [rawPosts, setRawPosts] = useState<RawPost[]>([]);
  const { search } = useLocation();

  // URLSearchParams は search に依存して再生成
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const queryTag = query.get("tag");

  // 投稿データの取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPosts();
        if (response) {
          setRawPosts(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [fetchPosts]);

  // 生データから投稿情報に変換
  const posts: Post[] = useMemo(
    () =>
      rawPosts.map((post) => ({
        id: post.id,
        title: post.metadata.title ?? "無題",
        description: post.metadata.description ?? "",
        thumbnail: post.metadata.thumbnail,
        tags: createTags(post.metadata.tags ?? []),
        content: post.content,
      })),
    [rawPosts]
  );

  // 投稿内のタグからユニークなタグ一覧と各タグに紐づく投稿を生成
  const tags: Tag[] = useMemo(() => {
    const tagMap = new Map<string, Tag>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tagMap.has(tag.name)) {
          tagMap.get(tag.name)!.posts.push(post);
        } else {
          tagMap.set(tag.name, { name: tag.name, posts: [post] });
        }
      });
    });
    return Array.from(tagMap.values());
  }, [posts]);

  // クエリパラメータに応じた投稿のフィルタリング
  const filteredPosts: Post[] = useMemo(() => {
    if (!queryTag) return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => tag.name === queryTag)
    );
  }, [posts, queryTag]);

  return (
    <Box display="flex" width="full" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        flexDirection="row"
        width="full"
        justifyContent={isDesktop ? "space-between" : "center"}
      >
        {isDesktop && <LeftAreaMemo style={{ width: "1/4" }} tags={tags} />}
        <RightArea
          queryTag={queryTag}
          posts={filteredPosts}
          style={{ width: isDesktop ? "3/4" : "11/12" }}
        />
      </Box>
    </Box>
  );
};

// タグ文字列配列から Tag オブジェクトの配列に変換するユーティリティ
const createTags = (tags: string[]): Tag[] =>
  tags.map((tag) => ({ name: tag, posts: [] }));

export default TechPosts;
