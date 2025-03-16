import { Box } from "@/app/components/ui/box";
import { minBodyHeight } from "@/app/consts";
import { BlogCard } from "./components/card";

type Post = {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
};

type TocAreaProps = {
  posts: Post[];
  style: {
    width: string;
  };
};

export const TocArea = ({ posts, style: { width } }: TocAreaProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      flexWrap="wrap"
      gap={4}
      width={width}
      minHeight={minBodyHeight}
      p={4}
      boxSizing={"border-box"}
      as="div"
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
        />
      ))}
    </Box>
  );
};
