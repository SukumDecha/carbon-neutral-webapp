import { MessageSquare, ThumbsUp } from "lucide-react";
import { BlogComment } from "./BlogComment";
import { useParams } from "react-router-dom";
import { useBlogById, useComment } from "../hooks/useBlog";
import { useUserById } from "../../user/hooks/useUser";
import EmptyBox from "../../../shared/components/EmptyBox";
import Loading from "../../../shared/components/Loading";
import { getImagePath } from "../../../shared/utils/helper.utils";

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blog, isLoading: isBlogLoading } = useBlogById(id!);
  const { data: admin, isLoading: isAdminLoading } = useUserById(
    blog?.admin_id || ""
  );

  const { data: comments, isLoading: isCommentsLoading } = useComment(
    blog?.id || -1
  );

  if (isBlogLoading || isAdminLoading || isCommentsLoading) return <Loading />;

  if (!blog || !admin) {
    return (
      <EmptyBox>
        <p>Blog not found</p>
      </EmptyBox>
    );
  }

  return (
    <div className="BlogDetails">
      <div className="BlogInfo">
        <div className="-userprofile">
          <img src={getImagePath(blog.thumbnail)} alt="thumbnails" />
          <span>{blog.title}</span>
        </div>
        <div className="-text">
          <p>{blog.title}</p>
          {blog.content}
        </div>
        <div className="-date">
          <span>{blog.createAt}</span>
          <div className="-rating">
            <span>
              <ThumbsUp />
              999+
            </span>
            <span>
              <MessageSquare />
              999+
            </span>
          </div>
        </div>
      </div>
      {comments && <BlogComment comments={comments} />}
    </div>
  );
};

export default BlogDetails;
