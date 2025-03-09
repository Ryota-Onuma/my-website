import { Link as ChakraUIBox } from "@chakra-ui/react";
import { Theme } from "@chakra-ui/react";
import { useColorMode } from "@//app/components/ui/theme";

type LinkProps = {
  href: string;
  children: React.ReactNode | string;
  variant?: "underline" | "plain";
};

export const Link = ({ children, href, variant }: LinkProps) => {
  const { colorMode } = useColorMode();
  return (
    <Theme appearance={colorMode}>
      <ChakraUIBox variant={variant ?? "underline"} href={href}>
        {children}
      </ChakraUIBox>
    </Theme>
  );
};
