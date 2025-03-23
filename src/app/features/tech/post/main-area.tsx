import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts/style";
import { Thumbnail } from "./components/thumbnail";
import { Title } from "./components/title";
import { Tags } from "./components/tags";
import { Content } from "./components/content";
import { Slugger } from "@/app/lib/slugger";
import { Post } from "./types";
import { Clock } from "@/app/components/ui/clock";

type MainAreaProps = {
  post: Post | undefined;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  style: {
    leftPadding: string;
    rightPadding: string;
  };
};

export const MainArea = ({
  post,
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
      height={minBodyHeight}
      ref={scrollContainerRef}
      as="div"
      gap={12}
      overflowY="auto"
    >
      {post && (
        <>
          <Box display="flex" flexDirection="column" gap={3}>
            <Thumbnail imageURL={post.thumbnail} alt="thumbnail" />
            <Title content={post.title} />
            <Box display="flex" flexDirection="row" gap={1} alignItems="center">
              <Clock />
              {post.date}
            </Box>
            <Tags contents={post.tags} />
          </Box>
          <Content markdownContent={post.content} />
        </>
      )}
    </Box>
  );
};
