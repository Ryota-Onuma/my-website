import { Box } from "@/app/components/ui/box";
import { BlogCard } from "./components/card";

export type Post = {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
  tags: string[];
};

type LeftAreaProps = {
  posts: Post[];
  style: {
    width: string;
  };
};

export const LeftArea = ({ posts, style: { width } }: LeftAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={4}
      width={width}
      boxSizing={"border-box"}
      as="div"
      px={12}
    >
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          description={post.description}
          link={`/tech/posts/${post.id}`}
          image={
            post.thumbnail
              ? {
                  src: post.thumbnail,
                  alt: `${post.title} thumbnail`,
                }
              : undefined
          }
          tags={post.tags}
        />
      ))}
    </Box>
  );
};
