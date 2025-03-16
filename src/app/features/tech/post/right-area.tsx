import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import React from "react";
import { Toc, TocItem } from "./components/toc";

type RightAreaProps = {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  toc: TocItem[];
  style: {
    width: string;
  };
};

export const RightArea = ({
  scrollContainerRef,
  toc,
  style: { width },
}: RightAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      width={width}
      minHeight={minBodyHeight}
      p={4}
      boxSizing={"border-box"}
      as="div"
      position={"relative"}
    >
      <Box
        position={"fixed"}
        right={0}
        top={"80px"}
        p={4}
        width={width}
        maxHeight={minBodyHeight}
        overflowY={"auto"}
      >
        <Toc toc={toc} scrollContainerRef={scrollContainerRef} />
      </Box>
    </Box>
  );
};
