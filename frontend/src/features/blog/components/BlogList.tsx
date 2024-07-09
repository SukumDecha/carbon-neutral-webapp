import Button from "../../../shared/components/Button";
import { IBlog } from "./Blog.type";

interface IProps {
  blogs: IBlog[];
}

export const BlogList = ({ blogs }: IProps) => {
  return (
    <div className="main">
      {blogs.map((blog) => (
        <div className="-blockblog">
          <img src={blog.img} alt="" />
          <div className="-info">
            <p className="-titlep">{blog.title}</p>
            <p>By {blog.user}</p>
            <div className="-viewer">
              <span>{blog.view} Views </span>
              <span>{blog.like} Likes </span>
              <span>{blog.comment} Comments </span>
            </div>
          </div>
          <div className="-ButtonBtn">
            <p className="-titlep">{blog.point} Points</p>
            <Button type="secondary">View</Button>
          </div>
        </div>
      ))}
      <div className="-blockblog BugBlog"></div>
    </div>
  );
};
