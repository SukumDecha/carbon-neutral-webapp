export type IBlog = {
  id: number;
  img: string;
  title: string;
  admin_id: string;
  thumbnail: string;
  content: string;
  view_count: number;
  liked_count: number;
  createAt?: string;
};

export type IAddBlog = Omit<IBlog, "id"> & {
  image: {
    fileList: { originFileObj: File }[];
  };
};

export type IUpdateBlog = Partial<IBlog> & {
  id: number;
  image?: {
    fileList: { originFileObj: File }[];
  };
};

export type IBlogComment = {
  id: number;
  blog_id: number;
  username: string;
  user_id: number;
  content: string;
  createdAt: string;
  avatar: string;
};

export type IAddBlogComment = Omit<IBlogComment, "id" | "createdAt">;

export type IUpdateBlogComment = Partial<IBlogComment> & {
  id: number;
};
