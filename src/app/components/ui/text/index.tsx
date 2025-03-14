import { Text as ChakraUIText } from "@chakra-ui/react";

export type fontWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

export type textStyle =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type TextProps = {
  children: React.ReactNode;
  textStyle?: textStyle;
  fontWeight?: fontWeight;
} & React.ComponentProps<typeof ChakraUIText>;

export const Text = ({
  children,
  textStyle,
  fontWeight,
  ...rest
}: TextProps) => {
  return (
    <ChakraUIText
      textStyle={textStyle ?? "md"}
      fontWeight={fontWeight ?? "normal"}
      {...rest}
    >
      {children}
    </ChakraUIText>
  );
};
