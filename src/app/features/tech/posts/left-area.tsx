import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";

type Tag = {
  name: string;
  count: number;
};

type LeftAreaProps = {
  tags: Tag[];
  style: {
    width: string;
  };
};

export const LeftArea = ({ tags, style: { width } }: LeftAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={width}
      p={4}
      minHeight={minBodyHeight}
      as="div"
    >
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={4}>
        {tags.map((tag) => (
          <Box key={tag.name} as="span" fontSize="lg" fontWeight="medium">
            #{tag.name} ({tag.count})
          </Box>
        ))}
      </Box>
    </Box>
  );
};
