import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type MediaQuery = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const useMediaQuery = (): MediaQuery => {
  const [media, setMedia] = useState<MediaQuery>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const device = useBreakpointValue({
    base: "mobile",
    sm: "mobile",
    md: "tablet",
    lg: "desktop",
    xl: "desktop",
  });

  useEffect(() => {
    setMedia({
      isMobile: device === "mobile",
      isTablet: device === "tablet",
      isDesktop: device === "desktop",
    });
  }, [device]);

  return media;
};
