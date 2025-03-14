import { Box, Button, Card as ChakraUICard, Image } from "@chakra-ui/react";
import { InternalLink } from "@/app/components/ui/link";

import { Text } from "@/app/components/ui/text";

type CardProps = {
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  link: string;
};
const hoge =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
export const Card = ({ image, title, description, link }: CardProps) => {
  return (
    <ChakraUICard.Root maxW="sm" overflow="hidden" borderWidth="1px">
      <Image src={image ? image.src : hoge} alt={image ? image.alt : "hoge"} />
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
