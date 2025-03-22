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

import { Loading } from "@/app/components/ui/loading";
import { useLoading } from "@/app/hooks/useLoading";
import { useEffect } from "react";

export const Layout = () => {
  const { colorMode } = useColorMode();
  const { loading } = useLoading();

  useEffect(() => {
    console.log("Layout mounted");
    return () => {
      console.log("Layout unmounted");
    };
  }, []);

  return (
    <>
      <Theme appearance={colorMode}>
        <Header width={headerWidth} height={headerHeight} />
        {loading ? (
          <Loading />
        ) : (
          <Box
            as="main"
            boxSizing={"border-box"}
            width={headerWidth}
            minHeight={minBodyHeight}
          >
            <Outlet />
          </Box>
        )}

        <Footer width={footerWidth} height={footerHeight} />
      </Theme>
    </>
  );
};
