import { Button as ChakraUIButton } from "@chakra-ui/react";

type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return <ChakraUIButton>{children}</ChakraUIButton>;
};
