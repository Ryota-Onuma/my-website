import { Routes, Route } from "react-router";
import Home from "@/app/routes/home";
import TechPosts from "@/app/routes/tech/posts";
import TechPost from "@/app/routes/tech/post";
import PageNotFound from "@/app/routes/not-found";
import { Layout } from "./layout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tech/posts">
          <Route index element={<TechPosts />} />
          <Route path=":postId" element={<TechPost />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
