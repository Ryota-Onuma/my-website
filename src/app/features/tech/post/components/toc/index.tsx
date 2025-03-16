import { Box } from "@chakra-ui/react";
import { HashLink } from "@/app/components/ui/link";

export type TocItem = { id: string; title: string; level: number };

// handleScroll関数を明示的に定義
const handleScroll = (
  el: HTMLElement | null,
  scrollContainerRef: React.RefObject<HTMLDivElement>
) => {
  if (scrollContainerRef.current && el) {
    const scrollContainer = scrollContainerRef.current;
    const offsetTop =
      el.getBoundingClientRect().top -
      scrollContainer.getBoundingClientRect().top +
      scrollContainer.scrollTop;

    scrollContainer.scrollTo({
      top: offsetTop - 16, // 見出しの上に余裕を持たせるなら調整してください
      behavior: "smooth",
    });
  }
};

type TocProps = {
  toc: TocItem[];
  scrollContainerRef: React.RefObject<HTMLDivElement>;
};

export const Toc = ({ toc, scrollContainerRef }: TocProps) => (
  <Box>
    {toc.map(({ id, title, level }) => (
      <HashLink
        key={id}
        to={`#${id}`}
        scroll={(el) => handleScroll(el, scrollContainerRef)}
      >
        <Box
          pl={level * 3}
          _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
        >
          {title}
        </Box>
      </HashLink>
    ))}
  </Box>
);
