import { UIProvider } from "./ui";
import { LoadingProvider } from "@/app/providers/loading";
import { ErrorProvider } from "@/app/providers/error";
import { Theme } from "@chakra-ui/react";
import { useColorMode } from "@/app/components/ui/theme";
import ErrorBoundaryProvider from "@/app/providers/error-boundary";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UIProvider>
      <ErrorBoundaryProvider>
        <ErrorProvider>
          <LoadingProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </LoadingProvider>
        </ErrorProvider>
      </ErrorBoundaryProvider>
    </UIProvider>
  );
};

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode(); // ✅ 必ずUIProvider（next-themes）の内側で呼ぶ
  return <Theme appearance={colorMode}>{children}</Theme>;
};
