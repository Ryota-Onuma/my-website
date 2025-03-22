import { createContext } from "react";

type ErrorContextType = {
  error: Error | null;
  setError: (value: Error) => void;
};

export const ErrorContext = createContext<ErrorContextType | null>(null);
