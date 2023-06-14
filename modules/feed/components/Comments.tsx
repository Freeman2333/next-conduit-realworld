import React, { FC } from "react";
import { useParams } from "next/navigation";

import CommentForm from "./CommentForm";
import { useGetCommentsQuery } from "@modules/feed/api/repository";
import CommentsItem from "./CommentsItem";

const Comments: FC = () => {
  const { slug } = useParams();

  const { data, isLoading, isFetching } = useGetCommentsQuery({
    slug,
  });

  if (isLoading || isFetching) {
    return <div>comments loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <CommentForm slug={slug} />
      {data?.comments.map((comment) => {
        return (
          <CommentsItem
            key={comment?.id}
            comment={comment}
            articleSlug={slug}
          />
        );
      })}
    </div>
  );
};

export default Comments;
