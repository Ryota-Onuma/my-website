import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { useSearchParams } from "react-router-dom";

export type Tag = {
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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (clickedTag: string) => {
    searchParams.set("tag", clickedTag);
    setSearchParams(searchParams);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      width={width}
      p={8}
      minHeight={minBodyHeight}
      as="div"
    >
      <Box
        width={"full"}
        display={"grid"}
        gridTemplateColumns={"repeat(2, 1fr)"}
        gap={2}
      >
        {tags.map((tag) => (
          <Box key={tag.name} as="span" fontSize="md" fontWeight="medium">
            <Box
              onClick={() => handleClick(tag.name)}
              as="span"
              cursor="pointer"
            >
              #{tag.name} ({tag.count})
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
