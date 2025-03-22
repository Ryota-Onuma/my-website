import { Image as ChakraUIImage } from "@chakra-ui/react";

type ImageProps = {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  aspectRatio?: string;
};

export const MusicianDuck = ({ width, height }: ImageProps) => {
  return (
    <Image
      src={"/musician_duck.png"}
      alt={"Musician Duck"}
      width={width}
      height={height}
    />
  );
};

export const Image = ({ width, height, src, alt, aspectRatio }: ImageProps) => {
  return (
    <ChakraUIImage
      src={src ?? "/musician_duck.png"}
      alt={alt ?? "Musician Duck"}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
    />
  );
};
