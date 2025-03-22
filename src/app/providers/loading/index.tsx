import { LoadingContext } from "@/app/contexts/loading";
import { ReactNode, useMemo, useState } from "react";

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const value = useMemo(() => ({ loading, setLoading }), [loading]);
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
