import { Button as ChakraUIButton } from "@chakra-ui/react";

type ButtonProps = {
  children: React.ReactNode;
  areaLabel?: string;
  onClick?: () => void;
};

export const Button = ({ children, areaLabel, onClick }: ButtonProps) => {
  return (
    <ChakraUIButton onClick={onClick} aria-label={areaLabel}>
      {children}
    </ChakraUIButton>
  );
};
