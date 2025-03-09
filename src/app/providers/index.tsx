import { UIProvider } from "./ui";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <UIProvider>{children}</UIProvider>;
};
