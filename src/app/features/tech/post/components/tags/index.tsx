import { InternalLink } from "@/app/components/ui/link";
import { Box } from "@/app/components/ui/box";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";

type TagsProps = {
  contents: string[];
};

export const Tags = ({ contents }: TagsProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box display="flex" flexWrap="wrap" mt={4}>
      {contents.map((tag, i) => (
        <InternalLink key={i} href={`/tech/posts?tag=${tag}`}>
          <Box
            px={2}
            borderRadius="md"
            mr={2}
            mb={2}
            border={
              isLightMode(colorMode) ? "1px solid black" : "1px solid white"
            }
          >
            #{tag}
          </Box>
        </InternalLink>
      ))}
    </Box>
  );
};
