import { UIProvider } from "./ui";
import { LoadingProvider } from "@/app/providers/loading";
import { Theme } from "@chakra-ui/react";
import { useColorMode } from "@/app/components/ui/theme";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { colorMode } = useColorMode();
  return (
    <LoadingProvider>
      <UIProvider>
        <Theme appearance={colorMode}>{children}</Theme>
      </UIProvider>
    </LoadingProvider>
  );
};
