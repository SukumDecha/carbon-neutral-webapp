import { useState } from "react";
import Button from "../shared/components/Button";
import { IBlog } from "../features/blog/blog.type";
import { BlogList } from "../features/blog/components/BlogList";

const Blog = [
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
  {
    img: "Vultures.png",
    title: "Hood",
    user: "skibidi",
    view: 200,
    like: 22,
    dislike: 20,
    comment: 20,
    point: 5000,
  },
];

const BlogScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>(Blog);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = Blog.filter(
      (blog) =>
        blog.title.toLowerCase().includes(value.toLowerCase()) ||
        blog.user.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div className="BlogScreen">
      <div className="navmore">
        <input
          className="blogSearch"
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="btn">
          <Button>Featured Topics</Button>
          <Button>Most Recent</Button>
          <Button>Most Popular</Button>
        </div>
      </div>
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};

export default BlogScreen;
