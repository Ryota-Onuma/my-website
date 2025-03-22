import { ErrorContext } from "@/app/contexts/error";
import { useState } from "react";

type ErrorProviderProps = {
  children: React.ReactNode;
};

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<Error | null>(null);

  // エラーが状態にある場合、render時にエラーをthrowして ErrorBoundaryに捕捉させる
  if (error) {
    throw error;
  }

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
