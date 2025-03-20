// import { Box } from "@/app/components/ui/box";
import { Card } from "@/app/components/ui/card";
import { Post } from "../../types";

type BlogCardProps = {
  post: Post;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card
      title={post.title}
      description={post.description}
      link={`/tech/posts/${post.id}`}
      image={{
        src:
          post.thumbnail ??
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        alt: post.title,
      }}
      tags={post.tags.map((tag) => tag.name)}
      style={{ width: "full" }}
    />
  );
};
