export type FrontMatter = {
  title?: string;
  date?: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  [key: string]: unknown; // 他の任意の項目にも対応
};

export type ParsedMarkdown = {
  metadata: FrontMatter;
  content: string;
};

export const parseMarkdown = (markdown: string): ParsedMarkdown | null => {
  const frontMatterMatch = markdown.match(/^---\n([\s\S]+?)\n---/);
  if (!frontMatterMatch) return null;

  const frontMatterRaw = frontMatterMatch[1];
  const content = markdown.slice(frontMatterMatch[0].length).trim();

  const lines = frontMatterRaw.split("\n");
  const metadata: FrontMatter = {};
  let currentKey: keyof FrontMatter | null = null;

  for (let line of lines) {
    if (/^\s*-\s+/.test(line) && currentKey) {
      const value = line.replace(/^\s*-\s+/, "").trim();
      if (Array.isArray(metadata[currentKey])) {
        (metadata[currentKey] as string[]).push(value);
      } else {
        metadata[currentKey] = [value];
      }
    } else {
      const [key, ...rest] = line.split(":");
      if (!key || rest.length === 0) continue;

      const value = rest
        .join(":")
        .trim()
        .replace(/^["']|["']$/g, "");
      metadata[key.trim()] = value;
      currentKey = key.trim() as keyof FrontMatter;
    }
  }

  return { metadata, content };
};
