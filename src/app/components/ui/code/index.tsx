import { Code as ChakraUICode } from "@chakra-ui/react";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";

type CodeProps = {
  children: React.ReactNode;
};

export const Code = ({ children }: CodeProps) => {
  const { colorMode } = useColorMode();
  return (
    <ChakraUICode variant={isLightMode(colorMode) ? "solid" : "surface"}>
      {children}
    </ChakraUICode>
  );
};
