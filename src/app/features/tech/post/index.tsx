import { useParams } from "react-router";
import { TocArea } from "./toc-area";
import { MainArea } from "./main-area";
import { Box } from "@/app/components/ui/box";
import { useEffect, useState, useRef, useMemo } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post as rawPost } from "@/app/hooks/usePosts";
import { Post, Tag } from "./types";
import { useLoading } from "@/app/hooks/useLoading";
import { Slugger } from "@/app/lib/slugger";

const TechPost = () => {
  const { postId } = useParams();
  const { findPost } = useFindPosts();
  const [rawPost, setRawPost] = useState<rawPost>();

  const { setLoading } = useLoading();
  const { isDesktop } = useMediaQuery();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!postId) {
          return;
        }
        const response = await findPost(postId);

        if (response) {
          setRawPost(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId, findPost]);

  const post: Post | undefined = useMemo(() => {
    if (!rawPost) return undefined;
    return {
      id: rawPost.id,
      title: rawPost.metadata.title ?? "タイトルなし",
      description: rawPost.metadata.description ?? "",
      thumbnail: rawPost.metadata.thumbnail,
      tags: createTags(rawPost.metadata.tags ?? []),
      content: rawPost.content,
    };
  }, [rawPost]);

  const toc = useMemo(() => {
    if (!post?.content) return [];
    const slugger = new Slugger();
    slugger.reset();
    return slugger.generateToc(post.content);
  }, [post?.content]);

  const scrollContainerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  return (
    <Box display="flex" width="full" justifyContent="center">
      <MainArea
        post={post}
        scrollContainerRef={scrollContainerRef}
        style={{
          leftPadding: isDesktop ? "20%" : "5%",
          rightPadding: isDesktop ? "20%" : "5%",
        }}
      />
      {isDesktop && (
        <TocArea
          scrollContainerRef={scrollContainerRef}
          toc={toc}
          style={{ width: "1/5" }}
        />
      )}
    </Box>
  );
};

const createTags = (tags: string[]): Tag[] =>
  tags.map((tag) => ({ name: tag, posts: [] }));

export default TechPost;
