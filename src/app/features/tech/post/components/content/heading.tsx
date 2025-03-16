import { Box } from "@/app/components/ui/box";
import { ComponentProps } from "react";
import { Text } from "@/app/components/ui/text";
import { Slugger } from "@/app/lib/slugger";

export const Heading1 = ({ children, ...props }: ComponentProps<"h1">) => {
  const id = new Slugger().getSlug(String(children));
  return (
    <Text id={id} fontSize="3xl" fontWeight="bold" {...props} my={4} as={"h1"}>
      {children}
    </Text>
  );
};

export const Heading2 = ({ children, ...props }: ComponentProps<"h2">) => {
  const id = new Slugger().getSlug(String(children));
  return (
    <Text id={id} fontSize="2xl" fontWeight="bold" {...props} my={4} as={"h2"}>
      {children}
    </Text>
  );
};

export const Heading3 = ({ children, ...props }: ComponentProps<"h3">) => {
  const id = new Slugger().getSlug(String(children));
  return (
    <Text id={id} fontSize="xl" fontWeight="bold" {...props} my={4} as={"h3"}>
      {children}
    </Text>
  );
};

export const Heading4 = ({ children, ...props }: ComponentProps<"h4">) => {
  const id = new Slugger().getSlug(String(children));
  return (
    <Text id={id} fontSize="lg" fontWeight="bold" {...props} my={4} as={"h4"}>
      {children}
    </Text>
  );
};

export const Heading5 = ({ children, ...props }: ComponentProps<"h5">) => {
  const id = new Slugger().getSlug(String(children));
  return (
    <Text id={id} fontSize="md" fontWeight="bold" {...props} my={4} as={"h5"}>
      {children}
    </Text>
  );
};

export const Heading6 = ({ children, ...props }: ComponentProps<"h6">) => {
  const id = new Slugger().getSlug(String(children));
  return (
    <Text id={id} fontSize="sm" fontWeight="bold" {...props} my={4} as={"h6"}>
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
