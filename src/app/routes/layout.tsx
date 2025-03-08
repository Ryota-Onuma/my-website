import { Outlet } from "react-router";
import { Header } from "@/app/components/ui/header";
import { Footer } from "@/app/components/ui/footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
