import { createContext, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export type theme = "light" | "dark";

type ThemeContextType = {
  theme: theme;
  setTheme: React.Dispatch<React.SetStateAction<theme>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<theme>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
