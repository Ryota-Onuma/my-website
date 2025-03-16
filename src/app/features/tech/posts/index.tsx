import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { LeftArea } from "./left-area";
import { TocArea } from "./right-area";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post } from "@/app/hooks/usePosts";
import { useEffect, useState } from "react";

const TechPosts = () => {
  const { isDesktop } = useMediaQuery();
  const { fetchPosts } = useFindPosts();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchPosts();
        if (response) {
          setPosts(response);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <Box display="flex" width="full" justifyContent="center" p={16}>
        <Text
          textStyle="5xl"
          fontWeight="bold"
          textAlign={"left"}
          width={"full"}
          display={"inline-block"}
          py={4}
        >
          Tech Blog
        </Text>
      </Box>
      <Box display="flex" width="full" justifyContent="center">
        {isDesktop && <LeftArea style={{ width: "1/5" }} />}
        <TocArea
          posts={posts.map((post) => ({
            id: post.id,
            title: post.metadata.title ?? "無題",
            description: post.metadata.description ?? "",
            content: post.content,
            thumbnail: post.metadata.thumbnail,
          }))}
          style={{ width: isDesktop ? "4/5" : "10/12" }}
        />
      </Box>
    </>
  );
};
export default TechPosts;
