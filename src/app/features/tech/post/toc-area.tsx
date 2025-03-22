import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts/style";
import React from "react";
import { Toc, TocItem } from "./components/toc";

type TocAreaProps = {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  toc: TocItem[];
  style: {
    width: string;
  };
};

export const TocArea = ({
  scrollContainerRef,
  toc,
  style: { width },
}: TocAreaProps) => {
  return (
    <Box
      minHeight={minBodyHeight}
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
        zIndex={100}
      >
        <Toc toc={toc} scrollContainerRef={scrollContainerRef} />
      </Box>
    </Box>
  );
};
