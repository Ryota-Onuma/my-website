import { Box as ChakraUIBox } from "@chakra-ui/react";
import { Theme } from "@chakra-ui/react";
import { ElementType } from "react";
import { useColorMode } from "@//app/components/ui/theme";

type BoxProps = {
  children: React.ReactNode;
  element?: ElementType;
} & React.ComponentProps<typeof ChakraUIBox>;

export const Box = ({ children, element, ...rest }: BoxProps) => {
  const { colorMode } = useColorMode();
  return (
    <Theme appearance={colorMode}>
      <ChakraUIBox as={element ?? "div"} {...rest}>
        {children}
      </ChakraUIBox>
    </Theme>
  );
};
