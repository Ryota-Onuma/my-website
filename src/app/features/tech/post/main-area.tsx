import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { Thumbnail } from "./components/thumbnail";
import { Title } from "./components/title";
import { Content } from "./components/content";
import { Slugger } from "@/app/lib/slugger";

type MainAreaProps = {
  title: string;
  markdownContent: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  style: {
    leftPadding: string;
    rightPadding: string;
  };
};

export const MainArea = ({
  title,
  markdownContent,
  scrollContainerRef,
  style: { leftPadding, rightPadding },
}: MainAreaProps) => {
  new Slugger().reset();
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={"full"}
      pl={leftPadding}
      pr={rightPadding}
      boxSizing={"border-box"}
      height={minBodyHeight} // ←heightを明示
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
