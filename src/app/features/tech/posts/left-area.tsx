import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";
import { minBodyHeight } from "@/app/consts";
import { useSearchParams } from "react-router-dom";
import { InternalLink } from "@/app/components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Tag } from "./types";
import { useState } from "react";

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
      alignItems={"flex-end"}
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
  const [clicled, setClicled] = useState(false);

  const updateTag = (clickedTag: string) => {
    searchParams.set("tag", clickedTag);
    setSearchParams(searchParams);
  };

  return (
    <Box
      key={tag.name}
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
          onClick={() => setClicled(!clicled)}
          cursor="pointer"
        >
          {clicled ? <FaChevronDown /> : <FaChevronRight />}
        </Box>
      </Box>
      {clicled && (
        <Box
          width="full"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={2}
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
      )}
    </Box>
  );
};
