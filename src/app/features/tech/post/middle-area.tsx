import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { Thumbnail } from "./components/thumbnail";
import { Title } from "./components/title";
import { Content } from "./components/content";

type MiddleAreaProps = {
  markdownContent: string;
  style: {
    width: string;
  };
};

export const MiddleArea = ({
  markdownContent,
  style: { width },
}: MiddleAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={width}
      px={4}
      minHeight={minBodyHeight}
      as="div"
      gap={12}
    >
      <Thumbnail />
      <Title content="blog title" />
      <Content markdownContent={markdownContent} />
    </Box>
  );
};
