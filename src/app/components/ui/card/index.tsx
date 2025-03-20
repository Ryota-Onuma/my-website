import {
  Box,
  Button,
  Card as ChakraUICard,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import { InternalLink } from "@/app/components/ui/link";
import { Text } from "@/app/components/ui/text";

type CardProps = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
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
          <Text>{title}</Text>
        </ChakraUICard.Title>
        <ChakraUICard.Description>{description}</ChakraUICard.Description>
      </ChakraUICard.Body>
      <ChakraUICard.Footer gap="2" width={"full"}>
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"full"}
          gap={2}
        >
          <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
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
