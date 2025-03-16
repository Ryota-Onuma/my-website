import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { sluggerInstance } from "@/app/lib/slugger";
import { HashLink } from "react-router-hash-link";

type RightAreaProps = {
  markdownContent: string;
  style: {
    width: string;
  };
};

type TocItem = { id: string; title: string; level: number };

const Toc = ({ toc }: { toc: TocItem[] }) => (
  <Box>
    {toc.map(({ id, title, level }) => (
      <Box
        key={id}
        pl={level * 3}
        _hover={{ bg: "gray.200", cursor: "pointer" }}
      >
        <HashLink smooth to={`#${id}`}>
          {title}
        </HashLink>
      </Box>
    ))}
  </Box>
);

export const RightArea = ({
  markdownContent,
  style: { width },
}: RightAreaProps) => {
  sluggerInstance.reset();
  const toc = sluggerInstance.generateToc(markdownContent);
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      width={width}
      minHeight={minBodyHeight}
      p={4}
      boxSizing={"border-box"}
      as="div"
      position={"relative"}
    >
      <Box
        position={"fixed"}
        right={0}
        top={"80px"}
        p={4}
        width={width}
        maxHeight={minBodyHeight}
        overflowY={"auto"}
      >
        <Toc toc={toc} />
      </Box>
    </Box>
  );
};
