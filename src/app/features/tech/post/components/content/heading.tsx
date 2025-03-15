import { Box } from "@/app/components/ui/box";
import { ComponentProps } from "react";
import { Text } from "@/app/components/ui/text";

export const Heading1 = ({ children, ...props }: ComponentProps<"h1">) => {
  return (
    <Text fontSize="3xl" fontWeight="bold" {...props} mb={4}>
      {children}
    </Text>
  );
};

export const Heading2 = ({ children, ...props }: ComponentProps<"h2">) => {
  return (
    <Text fontSize="2xl" fontWeight="bold" {...props} mb={4}>
      {children}
    </Text>
  );
};

export const Heading3 = ({ children, ...props }: ComponentProps<"h3">) => {
  return (
    <Text fontSize="xl" fontWeight="bold" {...props} mb={4}>
      {children}
    </Text>
  );
};

export const Heading4 = ({ children, ...props }: ComponentProps<"h4">) => {
  return (
    <Text fontSize="lg" fontWeight="bold" {...props} mb={4}>
      {children}
    </Text>
  );
};

export const Heading5 = ({ children, ...props }: ComponentProps<"h5">) => {
  return (
    <Text fontSize="md" fontWeight="bold" {...props} mb={4}>
      {children}
    </Text>
  );
};

export const Heading6 = ({ children, ...props }: ComponentProps<"h6">) => {
  return (
    <Text fontSize="sm" fontWeight="bold" {...props} mb={4}>
      {children}
    </Text>
  );
};

export const P = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <Box my={4}>
      <Text {...props} as="p">
        {children}
      </Text>
    </Box>
  );
};
