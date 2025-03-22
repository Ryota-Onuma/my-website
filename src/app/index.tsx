import { AppProvider } from "@/app/providers";
import { AppRouter } from "@/app/routes";
import { BrowserRouter } from "react-router";

export const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
};
