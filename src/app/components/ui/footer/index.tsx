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
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>Copyright © 2025 Ryota Onuma</Box>
    </Box>
  );
};
