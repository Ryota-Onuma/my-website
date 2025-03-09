import { Box } from "@/app/components/ui/box";

type FooterProps = {
  width: string;
  height: string;
};

export const Footer = ({ width, height }: FooterProps) => {
  return (
    <Box
      as="footer"
      width={width}
      height={height}
      boxSizing={"border-box"}
      p={4}
      textAlign="center"
    >
      Copyright © 2025 Ryota Onuma
    </Box>
  );
};
