// usePosts.ts
import { useCallback, useMemo } from "react";
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

  const findPost = useCallback(
    async (postId: string): Promise<Post> => {
      const entry = Object.entries(posts).find(([filePath]) =>
        filePath.includes(`/${postId}.md`)
      );
      if (!entry) {
        throw new FindPostsError(`Post not found: ${postId}`);
      }
      const [filePath, getUrl] = entry;
      try {
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
        const id = filePath.split("/").pop()?.split(".")[0] || "";
        return { id, metadata, content: parsed.content };
      } catch (error) {
        if (error instanceof Error) {
          throw new FindPostsError(error.message);
        }
        throw new FindPostsError("Failed to fetch post");
      }
    },
    [posts]
  );

  const fetchPosts = useCallback(async (): Promise<Post[]> => {
    try {
      const postsList = await Promise.all(
        Object.entries(posts).map(async ([filePath, getUrl]) => {
          const postURL = await getUrl();
          const response = await fetch(postURL);
          const rawContent = await response.text();
          const parsed = parseMarkdown(rawContent);
          if (!parsed) throw new FindPostsError("Failed to parse front matter");
          const id = filePath.split("/").pop()?.split(".")[0] || "";
          return { id, metadata: parsed.metadata, content: parsed.content };
        })
      );
      return postsList;
    } catch (error) {
      throw new FindPostsError(`Failed to fetch posts ${error}`);
    }
  }, [posts]);

  return { findPost, fetchPosts };
};

export default useFindPosts;
