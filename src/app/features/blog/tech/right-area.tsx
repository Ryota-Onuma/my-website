import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { BlogCard } from "@/app/features/blog/tech/components/card";

type RightAreaProps = {
  style: {
    width: string;
  };
};

export const RightArea = ({ style: { width } }: RightAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      flexWrap="wrap"
      gap={4}
      width={width}
      minHeight={minBodyHeight}
      p={4}
      boxSizing={"border-box"}
      as="div"
    >
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </Box>
  );
};
