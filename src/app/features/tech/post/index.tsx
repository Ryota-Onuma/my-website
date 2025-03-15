import { useParams } from "react-router";
import { RightArea } from "./right-area";
import { LeftArea } from "./left-area";
import { MiddleArea } from "./middle-area";
import { Box } from "@/app/components/ui/box";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

const TechPost = () => {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { isDesktop } = useMediaQuery();

  return (
    <Box display="flex" width="full" justifyContent="center">
      {isDesktop && <LeftArea style={{ width: "1/5" }} />}
      <MiddleArea
        markdownContent={content}
        style={{ width: isDesktop ? "3/5" : "full" }}
      />
      {isDesktop && <RightArea style={{ width: "1/5" }} />}
    </Box>
  );
};
export default TechPost;
