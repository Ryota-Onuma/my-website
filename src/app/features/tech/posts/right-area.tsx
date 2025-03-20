import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { BlogCard } from "./components/card";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";
import { Post } from "./types";

type RightAreaProps = {
  queryTag: string | null;
  posts: Post[];
  style: {
    width: string;
  };
};

export const RightArea = ({
  queryTag,
  posts,
  style: { width },
}: RightAreaProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      gap={8}
      width={width}
      boxSizing={"border-box"}
    >
      <Box
        display="flex"
        flexDirection="row"
        width={width}
        py={8}
        borderBottom={
          isLightMode(colorMode) ? `1px solid black` : `1px solid white`
        }
      >
        <Text fontSize="5xl" as="h1">
          {queryTag ? `#${queryTag}` : "All Blog Posts"}
        </Text>
      </Box>
      <Box
        width={width}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        boxSizing="border-box"
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Box>
    </Box>
  );
};
