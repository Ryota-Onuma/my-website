import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { Thumbnail } from "./components/thumbnail";
import { Title } from "./components/title";
import { Content } from "./components/content";
import { Slugger } from "@/app/lib/slugger";

type MiddleAreaProps = {
  title: string;
  markdownContent: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  style: {
    width: string;
  };
};

export const MiddleArea = ({
  title,
  markdownContent,
  scrollContainerRef,
  style: { width },
}: MiddleAreaProps) => {
  new Slugger().reset();
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={width}
      px={4}
      minHeight={minBodyHeight}
      height={`calc(100vh - 80px)`} // ←heightを明示
      ref={scrollContainerRef}
      as="div"
      gap={12}
      overflowY="auto"
    >
      <Thumbnail />
      <Title content={title} />
      <Content markdownContent={markdownContent} />
    </Box>
  );
};
