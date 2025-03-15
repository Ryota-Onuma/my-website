import { Box } from "@/app/components/ui/box";
import { Image as ImageComponent } from "@/app/components/ui/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Pre } from "./code-block";

import type { ComponentProps } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  P,
} from "./heading";

type ContentProps = {
  markdownContent: string;
};

const Image = ({ src, alt }: ComponentProps<"img">) => {
  return <ImageComponent src={src} alt={alt} />;
};

export const Content = ({ markdownContent }: ContentProps) => {
  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: Heading1,
          h2: Heading2,
          h3: Heading3,
          h4: Heading4,
          h5: Heading5,
          h6: Heading6,
          p: P,
          img: Image,
          pre: Pre, // Code Block
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
};
