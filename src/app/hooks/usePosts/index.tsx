import { useCallback } from "react";
import { parseMarkdown, FrontMatter } from "@/app/lib/markdown";
import {
  NotFoundError,
  InternalServerError,
  WrapInternalServerError,
} from "@/app/lib/error";

export type Post = {
  id: string;
  metadata: FrontMatter;
  content: string;
};

type GlobModule = () => Promise<string>;
type GlobModules = Record<string, GlobModule>;

const allPosts = import.meta.glob("@/app/contents/ja/*.md", {
  query: "?url",
  import: "default",
}) as GlobModules;

const filteredPosts = Object.fromEntries(
  Object.entries(allPosts).filter(([filePath]) => !filePath.includes(".draft."))
);

const useFindPosts = () => {
  const findPost = useCallback(async (postId: string): Promise<Post> => {
    const entry = Object.entries(filteredPosts).find(([filePath]) =>
      filePath.includes(`/${postId}.md`)
    );
    if (!entry) {
      throw new NotFoundError(`Post not found: ${postId}`);
    }
    const [filePath, getUrl] = entry;
    try {
      const postURL = await getUrl();
      const response = await fetch(postURL);
      const rawContent = await response.text();
      const parsed = parseMarkdown(rawContent);
      if (!parsed)
        throw new InternalServerError("Failed to parse front matter");
      const metadata = {
        title: parsed.metadata.title ?? "無題",
        description: parsed.metadata.description ?? "",
        thumbnail: parsed.metadata.thumbnail,
        tags: parsed.metadata.tags ?? [],
      };
      const id = filePath.split("/").pop()?.split(".")[0] || "";
      return { id, metadata, content: parsed.content };
    } catch (error) {
      throw WrapInternalServerError(error as Error);
    }
  }, []);

  const fetchPosts = useCallback(async (): Promise<Post[]> => {
    try {
      const postsList = await Promise.all(
        Object.entries(filteredPosts).map(async ([filePath, getUrl]) => {
          const postURL = await getUrl();
          const response = await fetch(postURL);
          const rawContent = await response.text();
          const parsed = parseMarkdown(rawContent);
          if (!parsed)
            throw new InternalServerError("Failed to parse front matter");
          const id = filePath.split("/").pop()?.split(".")[0] || "";
          return { id, metadata: parsed.metadata, content: parsed.content };
        })
      );
      return postsList;
    } catch (error) {
      throw WrapInternalServerError(error as Error);
    }
  }, []);

  return { findPost, fetchPosts };
};

export default useFindPosts;
