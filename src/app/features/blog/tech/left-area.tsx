import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";

type LeftAreaProps = {
  style: {
    width: string;
  };
};

export const LeftArea = ({ style: { width } }: LeftAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="red"
      width={width}
      minHeight={minBodyHeight}
      as="div"
    >
      left
    </Box>
  );
};
