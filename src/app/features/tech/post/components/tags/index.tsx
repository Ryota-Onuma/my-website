import { InternalLink } from "@/app/components/ui/link";
import { Box } from "@/app/components/ui/box";

type TagsProps = {
  contents: string[];
};

export const Tags = ({ contents }: TagsProps) => {
  return (
    <Box display="flex" flexWrap="wrap" mt={4} gap={4}>
      {contents.map((tag, i) => (
        <InternalLink key={i} href={`/tech/posts?tag=${tag}`}>
          <Box borderRadius="md">#{tag}</Box>
        </InternalLink>
      ))}
    </Box>
  );
};
