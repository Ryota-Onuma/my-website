import { Image } from "@/app/components/ui/image";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type ThumbnailProps = {
  imageURL?: string;
  alt?: string;
};

export const Thumbnail = ({ imageURL, alt }: ThumbnailProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Box width="100%">
      {mounted && (
        <Image
          src={imageURL ?? "/musician_duck.png"}
          alt={alt}
          width="full"
          height="auto"
          objectFit="cover"
          aspectRatio="16/9"
        />
      )}
    </Box>
  );
};
