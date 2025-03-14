import { UIProvider } from "./ui";
import { Theme } from "@chakra-ui/react";
import { useColorMode } from "@/app/components/ui/theme";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { colorMode } = useColorMode();
  return (
    <UIProvider>
      <Theme appearance={colorMode}>{children}</Theme>
    </UIProvider>
  );
};
