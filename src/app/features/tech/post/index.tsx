import { useParams } from "react-router";
import { RightArea } from "./right-area";
import { LeftArea } from "./left-area";
import { MiddleArea } from "./middle-area";
import { Box } from "@/app/components/ui/box";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post } from "@/app/hooks/usePosts";

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

  return (
    <Box display="flex" width="full" justifyContent="center">
      {isDesktop && <LeftArea style={{ width: "1/5" }} />}
      <MiddleArea
        title={post?.metadata.title ?? "無題"}
        markdownContent={post?.content ?? ""}
        style={{ width: isDesktop ? "3/5" : "full" }}
      />
      {isDesktop && (
        <RightArea
          markdownContent={post?.content ?? ""}
          style={{ width: "1/5" }}
        />
      )}
    </Box>
  );
};
export default TechPost;
