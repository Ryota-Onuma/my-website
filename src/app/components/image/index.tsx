import { Image } from "@chakra-ui/react";

type ImageProps = {
  width: string | number;
  height: string | number;
};

export const MusicianDuck = ({ width, height }: ImageProps) => {
  return (
    <Image
      src="/musician_duck.png"
      alt="Musician Duck"
      width={width}
      height={height}
    />
  );
};
