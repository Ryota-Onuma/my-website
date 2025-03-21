import { useState, useCallback, useMemo } from "react";
import { parseMarkdown, FrontMatter } from "@/app/lib/markdown";

class FindPostsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostError";
  }
}

export type Post = {
  id: string;
  metadata: FrontMatter;
  content: string;
};

type GlobModule = () => Promise<string>;
type GlobModules = Record<string, GlobModule>;

const useFindPosts = () => {
  const [loading, setLoading] = useState(false);

  // import.meta.globで取得した全ての投稿から、draftファイルを除外する
  const posts = useMemo(() => {
    const allPosts = import.meta.glob("@/app/contents/ja/*.md", {
      query: "?url",
      import: "default",
    }) as GlobModules;

    return Object.fromEntries(
      Object.entries(allPosts).filter(
        ([filePath]) => !filePath.includes(".draft.")
      )
    );
  }, []);

  // 特定の投稿をID（ファイル名）で検索する
  const findPost = useCallback(
    async (postId: string): Promise<Post> => {
      // 例: postId = "1" -> ファイルパス内に "/1.md" を含むエントリを探す
      const entry = Object.entries(posts).find(([filePath]) =>
        filePath.includes(`/${postId}.md`)
      );

      if (!entry) {
        throw new FindPostsError(`Post not found: ${postId}`);
      }

      const [filePath, getUrl] = entry;

      try {
        setLoading(true);
        const postURL = await getUrl();
        const response = await fetch(postURL);
        const rawContent = await response.text();
        const parsed = parseMarkdown(rawContent);

        if (!parsed) throw new FindPostsError("Failed to parse front matter");

        const metadata = {
          title: parsed.metadata.title ?? "無題",
          description: parsed.metadata.description ?? "",
          thumbnail: parsed.metadata.thumbnail,
          tags: parsed.metadata.tags ?? [],
        };

        // ファイルパス例: "@/app/contents/ja/1.md" から "1" を抽出する
        const id = filePath.split("/").pop()?.split(".")[0] || "";

        return {
          id,
          metadata,
          content: parsed.content,
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new FindPostsError(error.message);
        }
        throw new FindPostsError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    },
    [posts, setLoading]
  );

  // すべての投稿を取得する処理
  const fetchPosts = useCallback(async (): Promise<Post[]> => {
    try {
      setLoading(true);
      const postsList = await Promise.all(
        Object.entries(posts).map(async ([filePath, getUrl]) => {
          const postURL = await getUrl();
          const response = await fetch(postURL);
          const rawContent = await response.text();
          const parsed = parseMarkdown(rawContent);

          if (!parsed) throw new FindPostsError("Failed to parse front matter");

          // ファイルパスからIDを抽出する
          const id = filePath.split("/").pop()?.split(".")[0] || "";

          return {
            id,
            metadata: parsed.metadata,
            content: parsed.content,
          };
        })
      );
      return postsList;
    } catch (error) {
      throw new FindPostsError(`Failed to fetch posts ${error}`);
    } finally {
      setLoading(false);
    }
  }, [posts, setLoading]);

  return { findPost, fetchPosts, loading };
};

export default useFindPosts;
