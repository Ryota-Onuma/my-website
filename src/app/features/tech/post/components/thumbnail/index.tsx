import { Image } from "@/app/components/ui/image";

export const Thumbnail = () => {
  return (
    <Image
      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      alt="thumbnail"
      width="full"
      objectFit="cover"
    />
  );
};
