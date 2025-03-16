import { Text } from "@/app/components/ui/text";
import { Box } from "@chakra-ui/react";

type TitleProps = {
  content: string;
};

export const Title = ({ content }: TitleProps) => {
  return (
    <Box>
      <Text fontSize="4xl" as="h1" lineHeight="4xl">
        {content}
      </Text>
    </Box>
  );
};
