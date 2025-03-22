import { Image } from "@/app/components/ui/image";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Thumbnail = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Box position="relative" width="100%">
      {mounted && (
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="thumbnail"
          width="100%"
          height="auto"
          objectFit="cover"
          aspectRatio="16/9"
        />
      )}
    </Box>
  );
};
