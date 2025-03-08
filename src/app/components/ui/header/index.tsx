import { useContext } from "react";
import { ThemeContext } from "@/app/providers/theme";

export const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;
  return (
    <header>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Click me
      </button>
    </header>
  );
};
