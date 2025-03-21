import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";
import { minBodyHeight } from "@/app/consts";
import { useSearchParams } from "react-router-dom";
import { InternalLink } from "@/app/components/ui/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Tag } from "./types";
import { useState, useRef, useEffect } from "react";

export type LeftAreaProps = {
  tags: Tag[];
  style: {
    width: string;
  };
};

export const LeftArea = ({ tags, style: { width } }: LeftAreaProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      width={width}
      minHeight={minBodyHeight}
      as="div"
      gap={4}
      borderRight={
        isLightMode(colorMode) ? `1px solid black` : `1px solid white`
      }
    >
      <Box width="full" display="flex" flexDirection="column" pl={4}>
        {tags.map((tag) => (
          <EachTag key={tag.name} tag={tag} />
        ))}
      </Box>
    </Box>
  );
};

type EachTagProps = {
  tag: Tag;
};

const EachTag = ({ tag }: EachTagProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, setOpened] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const updateTag = (clickedTag: string) => {
    searchParams.set("tag", clickedTag);
    setSearchParams(searchParams);
  };

  // opened の状態が変わったときに、コンテンツの高さを計測して max-height を更新
  useEffect(() => {
    if (opened && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [opened]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize="md"
      fontWeight="medium"
      py={2}
      pr={4}
      gap={2}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="full"
      >
        <Text
          onClick={() => updateTag(tag.name)}
          as="span"
          cursor="pointer"
          whiteSpace="nowrap"
        >
          {tag.name}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          onClick={() => setOpened(!opened)}
          cursor="pointer"
        >
          {opened ? <FaChevronDown /> : <FaChevronRight />}
        </Box>
      </Box>
      {/* 展開部分：ref で高さを取得し、max-height を動的に更新 */}
      <Box
        ref={contentRef}
        width="full"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={2}
        style={{
          maxHeight: maxHeight,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        {tag.posts.map((post) => (
          <InternalLink key={post.id} href={`/tech/posts/${post.id}`}>
            <Box
              width="full"
              pl={4}
              cursor="pointer"
              _hover={{ fontWeight: "extrabold" }}
            >
              {post.title}
            </Box>
          </InternalLink>
        ))}
      </Box>
    </Box>
  );
};
