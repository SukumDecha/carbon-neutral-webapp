import { ThumbsDown, ThumbsUp } from "lucide-react";
import Button from "../../../shared/components/Button";

import { getImagePath } from "../../../shared/utils/helper.utils";
import { IBlogComment } from "../blog.type";

interface IProps {
  comments: IBlogComment[];
}
export const BlogComment = ({ comments }: IProps) => {
  return (
    <div className="BlogComment">
      <div className="AddComment">
        <img src="/login-bg.png" alt="" />
        <div className="-card">
          <input type="text" placeholder="Add a comment" />
          <Button>Post</Button>
        </div>
      </div>

      <div className="CommentZone">
        {comments?.map((comment) => (
          <div key={comment.id}>
            <div className="User">
              <img
                src={
                  getImagePath(comment.avatar) || "/public/default-avatar.jpg"
                }
                alt=""
              />
              <h3>{comment.username}</h3>
              <p>{comment.createdAt}</p>
            </div>
            <div className="Comment">
              <p>{comment.content}</p>
              <span>
                <ThumbsUp /> 1 <ThumbsDown />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
