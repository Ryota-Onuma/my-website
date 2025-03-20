import { Box } from "@/app/components/ui/box";
import { RightArea, Tag } from "./right-area";
import { LeftArea, Post as RightAreaPost } from "./left-area";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import useFindPosts, { Post } from "@/app/hooks/usePosts";
import { Text } from "@/app/components/ui/text";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

const TechPosts = () => {
  const { isDesktop } = useMediaQuery();
  const { fetchPosts } = useFindPosts();
  const [posts, setPosts] = useState<Post[]>([]);
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const queryTag = query.get("tag");

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
  }, [fetchPosts]);

  const rightAreaPosts: RightAreaPost[] = useMemo(
    () =>
      posts.map((post) => {
        const metadataTags = post.metadata.tags;
        let tags: string[];
        if (Array.isArray(metadataTags)) {
          tags = metadataTags;
        } else if (typeof metadataTags === "string") {
          tags = metadataTags.includes(",")
            ? metadataTags.split(",").map((tag) => tag.trim())
            : [post.metadata.tags as string];
        } else {
          tags = [];
        }

        return {
          id: post.id,
          title: post.metadata.title ?? "無題",
          description: post.metadata.description ?? "",
          content: post.content,
          thumbnail: post.metadata.thumbnail,
          tags,
        };
      }),
    [posts]
  );

  const tagWithCounts = useMemo(() => {
    const counterMap: Map<string, number> = new Map();
    const tags = rightAreaPosts.map((post) => post.tags).flat();

    tags.forEach((tag) => {
      if (counterMap.has(tag)) {
        const currentCount = counterMap.get(tag)!;
        counterMap.set(tag, currentCount + 1);
      } else {
        counterMap.set(tag, 1);
      }
    });

    return Array.from(counterMap).map(
      ([name, count]) =>
        ({
          name,
          count,
        } as Tag)
    );
  }, [rightAreaPosts]);

  const filteredPosts = useMemo(() => {
    if (!queryTag) return rightAreaPosts;
    return rightAreaPosts.filter((post) => post.tags.includes(queryTag));
  }, [rightAreaPosts, queryTag]);

  return (
    <>
      <Box display="flex" width="full" flexDirection="column">
        <Box display="flex" flexDirection="row" width="full" p={12}>
          <Text fontSize="5xl" as="h1">
            {queryTag ? `Blog Posts tagged #${queryTag}` : "All Blog Posts"}
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" width="full">
          <LeftArea
            posts={filteredPosts}
            style={{ width: isDesktop ? "3/4" : "full" }}
          />
          {isDesktop && (
            <RightArea style={{ width: "1/4" }} tags={tagWithCounts} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default TechPosts;
