import { Box } from "@/app/components/ui/box";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  backgroundColor: string;
};

export const Container = ({ children, backgroundColor }: ContainerProps) => {
  return (
    <Box
      width="33.33%"
      height="100vh"
      backgroundColor={backgroundColor}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {children}
    </Box>
  );
};
