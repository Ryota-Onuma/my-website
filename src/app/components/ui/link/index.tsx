import { Link as RouterLink } from "react-router";
import { Theme } from "@chakra-ui/react";
import { useColorMode } from "@//app/components/ui/theme";

type LinkProps = {
  href: string;
  children: React.ReactNode | string;
  variant?: "underline" | "plain";
  hoverStyle?: React.CSSProperties;
};

export const Link = ({ children, href, hoverStyle }: LinkProps) => {
  const { colorMode } = useColorMode();
  return (
    <Theme appearance={colorMode}>
      <RouterLink to={href} style={hoverStyle}>
        {children}
      </RouterLink>
    </Theme>
  );
};
