import { Box } from "@/app/components/ui/box";
import { LeftArea, LeftAreaProps } from "./left-area";
import { Post, Tag } from "./types";
import { RightArea } from "./right-area";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post as RawPost } from "@/app/hooks/usePosts";
import { useMemo, useState, memo, useEffect } from "react";
import { useLocation } from "react-router";
import { useLoading } from "@/app/hooks/useLoading";

const LeftAreaMemo = memo<LeftAreaProps>(LeftArea);

const TechPosts = () => {
  const { isDesktop } = useMediaQuery();
  const { fetchPosts } = useFindPosts();
  const { setLoading } = useLoading();
  const [rawPosts, setRawPosts] = useState<RawPost[]>([]);
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const queryTag = query.get("tag");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchPosts();

        setRawPosts(response ?? []);
      } catch (error) {
        setRawPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {filteredPosts.length > 0 && (
        <Box
          display="flex"
          flexDirection="row"
          width="full"
          justifyContent={isDesktop ? "space-between" : "center"}
        >
          {isDesktop && <LeftAreaMemo style={{ width: "25%" }} tags={tags} />}
          <RightArea
            queryTag={queryTag}
            posts={filteredPosts}
            style={{ width: isDesktop ? "75%" : "91.66%" }}
          />
        </Box>
      )}
    </Box>
  );
};

const createTags = (tags: string[]): Tag[] =>
  tags.map((tag) => ({ name: tag, posts: [] }));

export default TechPosts;
