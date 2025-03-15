import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type MediaQuery = {
  isMobile: boolean;
  isDesktop: boolean;
};

export const useMediaQuery = (): MediaQuery => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const isPC = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (isPC) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsDesktop(false);
      setIsMobile(true);
    }
  }, [isPC]);

  return { isMobile, isDesktop };
};
