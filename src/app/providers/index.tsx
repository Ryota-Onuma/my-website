import { UIProvider } from "./ui";
import { LoadingProvider } from "@/app/providers/loading";
import { ErrorProvider } from "@/app/providers/error";
import ErrorBoundaryProvider from "@/app/providers/error-boundary";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UIProvider>
      <ErrorBoundaryProvider>
        <ErrorProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </ErrorProvider>
      </ErrorBoundaryProvider>
    </UIProvider>
  );
};
