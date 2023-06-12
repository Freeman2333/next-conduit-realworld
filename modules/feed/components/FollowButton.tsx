import React, { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button } from "@/shared/components/Button";
import { Author } from "../api/dto/global-feed.in";
import { useLazyFollowAuthorQuery } from "@modules/profile/api/repository";

interface FollowButtonProps {
  author: Author;
}

const FollowButton: FC<FollowButtonProps> = ({ author }) => {
  const [triggerFavoriteArticleQuery] = useLazyFollowAuthorQuery();
  console.log(author);
  return (
    <Button
      btnStyle="LIGHT"
      variant="OUTLINE"
      onClick={() => triggerFavoriteArticleQuery({ author })}
    >
      <AiOutlinePlus className="inline" />{" "}
      {author.following ? "Unfollow" : "Follow"} {author?.username}
    </Button>
  );
};

export default FollowButton;
