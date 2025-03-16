import { useParams } from "react-router";
import { TocArea } from "./toc-area";
import { MainArea } from "./main-area";
import { Box } from "@/app/components/ui/box";
import { useEffect, useState, useRef, useMemo } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post } from "@/app/hooks/usePosts";
import { Slugger } from "@/app/lib/slugger";

const TechPost = () => {
  const { postId } = useParams();
  const { findPost } = useFindPosts();
  const [post, setPost] = useState<Post>();

  const { isDesktop } = useMediaQuery();
  useEffect(() => {
    (async () => {
      try {
        if (!postId) {
          return;
        }
        const response = await findPost(postId);

        if (response) {
          setPost(response);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [postId]);

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
        title={post?.metadata.title ?? "無題"}
        markdownContent={post?.content ?? ""}
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
export default TechPost;
