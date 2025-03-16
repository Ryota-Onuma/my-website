import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { LeftArea } from "./left-area";
import { RightArea } from "./right-area";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post } from "@/app/hooks/usePosts";
import { useEffect, useMemo, useState } from "react";

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

  const frontMatters = useMemo(
    () => posts.map((post) => post.metadata),
    [posts]
  );

  const extractTags = useMemo(() => {
    if (!frontMatters) return new Map();
    const metadataMap: Map<string, number> = new Map();

    frontMatters.forEach((metadata) => {
      const metadataTags = metadata.tags;
      let tags: string[];
      if (Array.isArray(metadataTags)) {
        tags = metadataTags;
      } else if (typeof metadataTags === "string") {
        tags = metadataTags.includes(",")
          ? metadataTags.split(",").map((tag) => tag.trim())
          : [metadata.tags as string];
      } else {
        tags = [];
      }
      if (!tags) return;

      tags.forEach((tag) => {
        if (metadataMap.has(tag)) {
          const currentCount = metadataMap.get(tag)!;
          metadataMap.set(tag, currentCount + 1);
        } else {
          metadataMap.set(tag, 1);
        }
      });
    });

    return metadataMap;
  }, [frontMatters]);

  const tags = useMemo(
    () =>
      Array.from(extractTags).map(([name, count]) => ({
        name,
        count,
      })),
    [extractTags]
  );

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
        {isDesktop && <LeftArea style={{ width: "1/5" }} tags={tags} />}
        <RightArea
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
