import { createContext } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType | null>(null);
