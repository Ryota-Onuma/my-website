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
} from "../consts/style";

// import { Loading } from "@/app/components/ui/loading";
// import { useLoading } from "@/app/hooks/useLoading";

type LayoutProps = {
  children: React.ReactNode;
};

export const Base = ({ children }: LayoutProps) => {
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
          {children}
        </Box>
        <Footer width={footerWidth} height={footerHeight} />
      </Theme>
    </>
  );
};

export const Layout = () => {
  // const { loading } = useLoading();
  // return <Base>{loading ? <Loading /> : <Outlet />}</Base>;
  return (
    <Base>
      <Outlet />
    </Base>
  );
};
