import { Box } from "@/app/components/ui/box";
import { LeftArea } from "./left-area";
import { RightArea } from "./right-area";

const TechBlog = () => {
  return (
    <Box display="flex" width="full">
      <LeftArea style={{ width: "1/4" }} />
      <RightArea style={{ width: "3/4" }} />
    </Box>
  );
};
export default TechBlog;
