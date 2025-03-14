import { Link as RouterLink } from "react-router";
import { Link as ChakraUILink, SystemStyleObject } from "@chakra-ui/react";

import { Nested } from "node_modules/@chakra-ui/react/dist/types/styled-system/css.types";

type LinkProps = {
  href: string;
  children: React.ReactNode | string;
  hoverStyle?: React.CSSProperties | Nested<SystemStyleObject>;
  style?: React.CSSProperties;
};

export const InternalLink = ({
  children,
  href,
  hoverStyle,
  style,
}: LinkProps) => {
  return (
    <RouterLink
      to={href}
      style={{
        ...(hoverStyle as React.CSSProperties),
        ...style,
      }}
    >
      {children}
    </RouterLink>
  );
};

export const ExternalLink = ({
  children,
  href,
  hoverStyle,
  style,
}: LinkProps) => {
  return (
    <ChakraUILink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...style,
      }}
      _hover={{
        ...(hoverStyle as Nested<SystemStyleObject>),
      }}
    >
      {children}
    </ChakraUILink>
  );
};
