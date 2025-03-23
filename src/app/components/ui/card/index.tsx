import {
  Box,
  Button,
  Card as ChakraUICard,
  Image,
  AspectRatio,
} from "@chakra-ui/react";

import { Clock } from "@/app/components/ui/clock";

import { InternalLink } from "@/app/components/ui/link";
import { Text } from "@/app/components/ui/text";

type CardProps = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  date: string;
  description: string;
  link: string;
  tags: string[];
  style: {
    width: string;
  };
};

export const Card = ({
  image,
  title,
  date,
  description,
  link,
  tags,
  style: { width },
}: CardProps) => {
  return (
    <ChakraUICard.Root width={width} overflow="hidden" borderWidth="1px">
      <AspectRatio ratio={16 / 9}>
        <Image src={image.src} alt={image.alt} objectFit="cover" />
      </AspectRatio>
      <ChakraUICard.Body gap="2">
        <ChakraUICard.Title>
          <Text as={"h1"} fontWeight="bold" fontSize={"2xl"}>
            {title}
          </Text>
        </ChakraUICard.Title>
        <Box display="flex" flexDirection="column" gap="2">
          <Box display="flex" alignItems="center" gap="2">
            <Clock />
            <Text>{date}</Text>
          </Box>
          <Text fontSize="md" fontWeight="medium">
            {description}
          </Text>
        </Box>
      </ChakraUICard.Body>
      <ChakraUICard.Footer gap="2" width={"full"}>
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"full"}
          gap={2}
        >
          <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
            {tags.map((tag) => (
              <Text key={tag} fontSize="sm" fontWeight="medium">
                #{tag}
              </Text>
            ))}
          </Box>
          <Box>
            <InternalLink href={link}>
              <Button>Read more</Button>
            </InternalLink>
          </Box>
        </Box>
      </ChakraUICard.Footer>
    </ChakraUICard.Root>
  );
};
