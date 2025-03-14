import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/app/routes/home";
import TechBlog from "@/app/routes/blog/tech";
import { Layout } from "./layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blog/tech" element={<TechBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
