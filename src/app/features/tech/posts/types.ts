export type Tag = {
  name: string;
  posts: Post[];
};

export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  thumbnail?: string;
  tags: Tag[];
};
