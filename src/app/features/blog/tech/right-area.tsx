import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";

type RightAreaProps = {
  style: {
    width: string;
  };
};

export const RightArea = ({ style: { width } }: RightAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="yellow"
      width={width}
      minHeight={minBodyHeight}
      as="div"
    >
      right
    </Box>
  );
};
