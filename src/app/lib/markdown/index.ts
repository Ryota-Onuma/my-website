export type FrontMatter = {
  title?: string;
  date?: string;
  thumbnail?: string;
  description?: string;
  tags?: string[] | string;
  [key: string]: unknown; // 他の任意の項目にも対応
};

export type ParsedMarkdown = {
  metadata: FrontMatter;
  content: string;
};

export const parseMarkdown = (markdown: string): ParsedMarkdown | null => {
  // フロントマター部分を正規表現で抽出
  const frontMatterRegex = /^---\n([\s\S]+?)\n---/;
  const match = markdown.match(frontMatterRegex);
  if (!match) return null;

  const rawFrontMatter = match[1];
  const content = markdown.slice(match[0].length).trim();
  const lines = rawFrontMatter.split("\n");

  const metadata: FrontMatter = {};
  let currentKey: keyof FrontMatter | null = null;

  // キーと値の行を解析するヘルパー関数
  const parseKeyValue = (
    line: string
  ): { key: keyof FrontMatter; value: string } | null => {
    const [rawKey, ...rawValue] = line.split(":");
    if (!rawKey || rawValue.length === 0) return null;
    return {
      key: rawKey.trim() as keyof FrontMatter,
      value: rawValue
        .join(":")
        .trim()
        .replace(/^["']|["']$/g, ""),
    };
  };

  for (const line of lines) {
    // リスト形式（ハイフンで始まる）の行の場合
    if (isListItem(line) && currentKey) {
      const listItem = line.replace(/^\s*-\s+/, "").trim();
      if (Array.isArray(metadata[currentKey])) {
        (metadata[currentKey] as string[]).push(listItem);
      } else {
        metadata[currentKey] = [listItem];
      }
    } else {
      // 通常のキー:値 の行の場合
      const parsed = parseKeyValue(line);
      if (!parsed) continue;
      metadata[parsed.key] = parsed.value;
      currentKey = parsed.key;
    }
  }

  return { metadata, content };
};

const isListItem = (line: string): boolean => {
  return /^\s*-\s+/.test(line);
};
