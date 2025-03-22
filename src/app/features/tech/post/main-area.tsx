import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts/style";
import { Thumbnail } from "./components/thumbnail";
import { Title } from "./components/title";
import { Content } from "./components/content";
import { Slugger } from "@/app/lib/slugger";
import { Post } from "./types";
import { useState, useEffect } from "react";

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Box>
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
        {post && mounted && (
          <>
            <Thumbnail imageURL={post.thumbnail} alt="thumbnail" />
            <Title content={post.title} />
            <Content markdownContent={post.content} />
          </>
        )}
      </Box>
    </Box>
  );
};
