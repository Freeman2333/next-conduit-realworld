import { FC } from "react";
import { Comment } from "@modules/feed/api/dto/article-comments.in";
import Link from "next/link";
import { DateTime } from "luxon";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteCommentMutation } from "@/modules/feed/api/repository";
import { toast } from "react-toastify";

interface CommentsItemProps {
  comment: Comment;
  articleSlug: string;
}

const CommentsItem: FC<CommentsItemProps> = ({ comment, articleSlug }) => {
  const { user } = useAuth();

  const [triggerDeleteCommentMutation] = useDeleteCommentMutation();

  const deleteComment = async () => {
    try {
      await triggerDeleteCommentMutation({
        articleSlug,
        commentId: comment.id,
      }).unwrap();
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  if (!comment) {
    return null;
  }

  return (
    <div className="border mb-4 rounded-md">
      <p className="p-3 border-b">{comment?.body}</p>
      <div className="p-3 flex bg-conduit-gray-150 justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={comment.author.image}
            alt={comment.author.username}
            className="h-5 w-5 rounded-full"
          />
          <Link
            href={`/${comment.author.username}`}
            className="text-conduit-gray-500 text-date hover:underline"
          >
            {comment.author.username}
          </Link>
          <span className="text-conduit-gray-500 text-date">
            {DateTime.fromISO(comment.createdAt).toLocaleString(
              DateTime.DATE_FULL
            )}
          </span>
        </div>
        {user?.username === comment.author.username && (
          <button onClick={deleteComment}>
            <AiFillDelete />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentsItem;
