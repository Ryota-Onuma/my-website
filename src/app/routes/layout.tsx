import { Outlet } from "react-router";
import { Header } from "@/app/components/ui/header";
import { Footer } from "@/app/components/ui/footer";
import { Box } from "@/app/components/ui/box";

const headerWidth = "100%";
const headerHeight = "60px";
const footerWidth = "100%";
const footerHeight = "60px";

export const Layout = () => {
  return (
    <>
      <Header width={headerWidth} height={headerHeight} />
      <Box
        as="main"
        p={12}
        boxSizing={"border-box"}
        width={headerWidth}
        minHeight={`calc(100vh - ${headerHeight} - ${footerHeight})`}
      >
        <Outlet />
      </Box>
      <Footer width={footerWidth} height={footerHeight} />
    </>
  );
};
