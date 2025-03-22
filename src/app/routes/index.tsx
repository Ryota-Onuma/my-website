import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/app/routes/home";
import TechPosts from "@/app/routes/tech/posts";
import TechPost from "@/app/routes/tech/post";
import { Layout } from "./layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tech/posts">
            <Route index element={<TechPosts />} />
            <Route path=":postId" element={<TechPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
