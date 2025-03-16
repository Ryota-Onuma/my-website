import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";

import { Box } from "@/app/components/ui/box";
import { Code } from "@/app/components/ui/code";

type CodeBlockProps = {
  fileName?: string;
  language?: string;
  children: string;
};

const CodeBlock = ({ fileName, language, children }: CodeBlockProps) => {
  return (
    <Box my={12}>
      {fileName && (
        <Box
          as="div"
          display="inline-block"
          backgroundColor={"gray.800"}
          color="gray.200"
          p={1}
          fontSize="sm"
        >
          <Box as="span">{fileName}</Box>
        </Box>
      )}
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{ padding: "20px" }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </Box>
  );
};

export const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <Code {...props}>{children}</Code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <Code {...props}>{children}</Code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps as {
    children: string;
    className?: string;
  };

  const classList = className ? className.split(":") : [];
  const language = classList[0]?.replace("language-", "");
  const fileName = classList[1];

  return (
    <CodeBlock language={language} fileName={fileName}>
      {code}
    </CodeBlock>
  );
};
