import { useParams } from "react-router";
import { RightArea } from "./right-area";
import { LeftArea } from "./left-area";
import { MiddleArea } from "./middle-area";
import { Box } from "@/app/components/ui/box";
import { useEffect, useState } from "react";

const TechPost = () => {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const posts = import.meta.glob("./contents/*.md", { as: "url" });

  useEffect(() => {
    const loadContent = posts[`./contents/${postId}.md`];
    if (loadContent) {
      loadContent()
        .then((url) => fetch(url))
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch(() => setError("記事の読み込みエラー"));
      return;
    }
  }, [postId]);

  return (
    <Box display="flex" width="full" justifyContent="center">
      <LeftArea style={{ width: "1/4" }} />
      <MiddleArea markdownContent={content} style={{ width: "1/2" }} />
      <RightArea style={{ width: "1/4" }} />
    </Box>
  );
};
export default TechPost;
