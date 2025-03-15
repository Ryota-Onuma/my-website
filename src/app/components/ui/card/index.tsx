import { Box, Button, Card as ChakraUICard, Image } from "@chakra-ui/react";
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
};

export const Card = ({ image, title, description, link }: CardProps) => {
  return (
    <ChakraUICard.Root maxW="sm" maxH="lg" overflow="hidden" borderWidth="1px">
      <Image src={image.src} alt={image.alt} />
      <ChakraUICard.Body gap="2">
        <ChakraUICard.Title>
          <Text>{title}</Text>
        </ChakraUICard.Title>
        <ChakraUICard.Description>{description}</ChakraUICard.Description>
      </ChakraUICard.Body>
      <ChakraUICard.Footer gap="2">
        <Box display="flex" justifyContent={"flex-end"} width={"full"}>
          <InternalLink href={link}>
            <Button>Read more</Button>
          </InternalLink>
        </Box>
      </ChakraUICard.Footer>
    </ChakraUICard.Root>
  );
};
