export type FrontMatter = {
  title?: string;
  date?: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
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
  let currentKey: string | null = null;

  // キーと値の行を解析するヘルパー関数
  const parseKeyValue = (
    line: string
  ): { key: string; value: string } | null => {
    const [rawKey, ...rawValue] = line.split(":");
    if (!rawKey || rawValue.length === 0) return null;
    return {
      key: rawKey.trim(),
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
      if (currentKey === "tags") {
        if (!metadata.tags) {
          metadata.tags = [];
        }
        metadata.tags.push(listItem);
      }
    } else {
      // 通常のキー:値 の行の場合
      const parsed = parseKeyValue(line);
      if (!parsed) continue;
      currentKey = parsed.key;

      // 期待するキーのみを対象にする
      switch (parsed.key) {
        case "title":
          metadata.title = parsed.value;
          break;
        case "date":
          metadata.date = parsed.value;
          break;
        case "thumbnail":
          metadata.thumbnail = parsed.value;
          break;
        case "description":
          metadata.description = parsed.value;
          break;
        case "tags":
          // コンマ区切りの場合と単一の値の場合を判定
          if (parsed.value.includes(",")) {
            metadata.tags = parsed.value.split(",").map((tag) => tag.trim());
          } else {
            metadata.tags = parsed.value ? [parsed.value] : [];
          }
          break;
        default:
          // 想定外のキーは無視するか、必要ならエラーハンドリング
          break;
      }
    }
  }

  return { metadata, content };
};

const isListItem = (line: string): boolean => {
  return /^\s*-\s+/.test(line);
};
