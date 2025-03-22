import { Button as ChakraUIButton } from "@chakra-ui/react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return <ChakraUIButton onClick={onClick}>{children}</ChakraUIButton>;
};
