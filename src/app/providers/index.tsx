import { ThemeProvider } from "./theme";
type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
