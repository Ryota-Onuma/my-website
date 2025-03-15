import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { Image as ImageComponent } from "@/app/components/ui/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";

type ContentProps = {
  markdownContent: string;
};

const Heading1 = ({ children, ...props }: ComponentProps<"h1">) => {
  return (
    <Text fontSize="3xl" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

const Heading2 = ({ children, ...props }: ComponentProps<"h2">) => {
  return (
    <Text fontSize="2xl" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

const Heading3 = ({ children, ...props }: ComponentProps<"h3">) => {
  return (
    <Text fontSize="xl" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

const Heading4 = ({ children, ...props }: ComponentProps<"h4">) => {
  return (
    <Text fontSize="lg" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

const Heading5 = ({ children, ...props }: ComponentProps<"h5">) => {
  return (
    <Text fontSize="md" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

const Heading6 = ({ children, ...props }: ComponentProps<"h6">) => {
  return (
    <Text fontSize="sm" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

const P = ({ children, ...props }: ComponentProps<"p">) => {
  return <Text {...props}>{children}</Text>;
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
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
};
