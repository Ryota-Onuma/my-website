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
  return <ImageComponent src={src} alt={alt} width="1/2" />;
};

const Ul = ({ children }: ComponentProps<"ul">) => {
  const ulStyle: React.CSSProperties = {
    listStyle: "disc",
    paddingLeft: "1em",
  };
  return <ul style={ulStyle}>{children}</ul>;
};

const Ol = ({ children }: ComponentProps<"ol">) => {
  const olStyle: React.CSSProperties = {
    listStyle: "decimal",
    paddingLeft: "1em",
  };
  return <ol style={olStyle}>{children}</ol>;
};

const Li = ({ children }: ComponentProps<"li">) => {
  const liStyle: React.CSSProperties = {
    margin: "0.5em 0",
    lineHeight: "1.5",
  };
  return <li style={liStyle}>{children}</li>;
};

const Checkbox = ({ checked, ...props }: ComponentProps<"input">) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled
      style={{
        marginRight: "0.5em",
        cursor: "pointer",
      }}
      {...props}
    />
  );
};

const Table = ({ children }: ComponentProps<"table">) => {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        marginBottom: "1em",
      }}
    >
      {children}
    </table>
  );
};

const TableHead = ({ children }: ComponentProps<"thead">) => {
  return <thead style={{ backgroundColor: "#f0f0f0" }}>{children}</thead>;
};

const TableBody = ({ children }: ComponentProps<"tbody">) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children }: ComponentProps<"tr">) => {
  return <tr>{children}</tr>;
};

const TableHeadCell = ({ children }: ComponentProps<"th">) => {
  return (
    <th
      style={{
        border: "1px solid #ccc",
        padding: "0.5em",
        textAlign: "left",
        fontWeight: "bold",
      }}
    >
      {children}
    </th>
  );
};

const TableCell = ({ children }: ComponentProps<"td">) => {
  return (
    <td
      style={{
        border: "1px solid #ccc",
        padding: "0.5em",
      }}
    >
      {children}
    </td>
  );
};

export const Content = ({ markdownContent }: ContentProps) => {
  return (
    <Box>
      <ReactMarkdown
        rehypePlugins={[remarkGfm]}
        components={{
          h1: Heading1,
          h2: Heading2,
          h3: Heading3,
          h4: Heading4,
          h5: Heading5,
          h6: Heading6,
          p: P,
          img: Image,
          ul: Ul,
          ol: Ol,
          li: Li,
          pre: Pre,
          input: ({ ...props }) => {
            if (props.type === "checkbox") {
              return <Checkbox {...props} />;
            }
            return <input {...props} />;
          },
          table: Table,
          thead: TableHead,
          tbody: TableBody,
          tr: TableRow,
          th: TableHeadCell,
          td: TableCell,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
};
