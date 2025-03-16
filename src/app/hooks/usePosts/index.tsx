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
  const posts = useMemo(() => {
    const allPosts = import.meta.glob("@/app/contents/ja/*.md", {
      query: "?url",
      import: "default",
    }) as GlobModules;

    // draftファイルを除外
    return Object.fromEntries(
      Object.entries(allPosts).filter(([path]) => !path.includes(".draft."))
    );
  }, []);

  const findPost = useCallback(
    async (postId: string): Promise<Post> => {
      const path = `/ja/${postId}.md`;
      const post = Object.entries(posts).find(([key]) =>
        key.includes(path)
      )?.[1];

      if (!post) {
        throw new FindPostsError(`Post not found: ${postId}`);
      }

      try {
        setLoading(true);
        const postURL = await post();
        const response = await fetch(postURL);
        const rawContent = await response.text();
        const parsed = parseMarkdown(rawContent);
        if (!parsed) throw new FindPostsError("Failed to parse front matter");

        const metadata = {
          title: parsed.metadata.title ?? "無題",
          description: parsed.metadata.description ?? "",
          thumbnail: parsed.metadata.thumbnail,
        };

        return {
          id: getPostId(postURL),
          metadata: metadata,
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

  const fetchPosts = useCallback(async (): Promise<Post[]> => {
    const postURLs = Object.values(posts);
    try {
      setLoading(true);
      const posts = await Promise.all(
        postURLs.map(async (url) => {
          const postURL = await url();
          const response = await fetch(postURL);
          const rawContent = await response.text();
          const parsed = parseMarkdown(rawContent);
          if (!parsed) throw new FindPostsError("Failed to parse front matter");
          return {
            id: getPostId(postURL),
            metadata: parsed.metadata,
            content: parsed.content,
          };
        })
      );

      return posts;
    } catch (error) {
      throw new FindPostsError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [posts, setLoading]);

  return { findPost, fetchPosts, loading };
};

export default useFindPosts;

// .md以前の箇所がID 例 1.md -> 1
const getPostId = (url: string) => {
  const splitted = url.split("/");
  const fileName = splitted[splitted.length - 1];
  return fileName.split(".")[0];
};
