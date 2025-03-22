import { Spinner } from "@chakra-ui/react";
import { Box } from "@/app/components/ui/box";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";
import { minBodyHeight } from "@/app/consts/style";
export const Loading = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"full"}
      height={minBodyHeight}
      bg={isLightMode(colorMode) ? "white" : "black"}
    >
      <Spinner size="xl" />
    </Box>
  );
};
