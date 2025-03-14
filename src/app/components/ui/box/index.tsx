import { Box as ChakraUIBox } from "@chakra-ui/react";

import { ElementType } from "react";

type BoxProps = {
  children: React.ReactNode;
  element?: ElementType;
} & React.ComponentProps<typeof ChakraUIBox>;

export const Box = ({ children, element, ...rest }: BoxProps) => {
  return (
    <ChakraUIBox as={element ?? "div"} {...rest}>
      {children}
    </ChakraUIBox>
  );
};
