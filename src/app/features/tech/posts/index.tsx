import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { LeftArea } from "./left-area";
import { RightArea } from "./right-area";
import { useBreakpointValue } from "@chakra-ui/react";

const TechPosts = () => {
  const isPC = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box display="flex" width="full" justifyContent="center" p={16}>
        <Text
          textStyle="5xl"
          fontWeight="bold"
          textAlign={"left"}
          width={"full"}
          display={"inline-block"}
          py={4}
        >
          Tech Blog
        </Text>
      </Box>
      <Box display="flex" width="full" justifyContent="center">
        {isPC && <LeftArea style={{ width: "1/5" }} />}
        <RightArea style={{ width: isPC ? "4/5" : "10/12" }} />
      </Box>
    </>
  );
};
export default TechPosts;
