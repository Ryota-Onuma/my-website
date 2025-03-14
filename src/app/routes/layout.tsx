import { Outlet } from "react-router";
import { Header } from "@/app/components/ui/header";
import { Footer } from "@/app/components/ui/footer";
import { Box } from "@/app/components/ui/box";
import { useColorMode } from "@/app/components/ui/theme";
import { Theme } from "@chakra-ui/react";
import {
  headerWidth,
  headerHeight,
  footerWidth,
  footerHeight,
  minBodyHeight,
} from "../consts";

export const Layout = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Theme appearance={colorMode}>
        <Header width={headerWidth} height={headerHeight} />
        <Box
          as="main"
          boxSizing={"border-box"}
          width={headerWidth}
          minHeight={minBodyHeight}
        >
          <Outlet />
        </Box>
        <Footer width={footerWidth} height={footerHeight} />
      </Theme>
    </>
  );
};
