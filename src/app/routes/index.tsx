import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/app/routes/home";
import { Layout } from "./layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
