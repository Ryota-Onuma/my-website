import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { BlogCard } from "./components/card";

export type Post = {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
  tags: string[];
};

type RightAreaProps = {
  posts: Post[];
  style: {
    width: string;
  };
};

export const RightArea = ({ posts, style: { width } }: RightAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      flexWrap="wrap"
      gap={4}
      width={width}
      height={minBodyHeight}
      boxSizing={"border-box"}
      as="div"
      overflowY={"auto"}
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
