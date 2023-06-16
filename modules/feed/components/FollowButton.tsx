import React, { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button } from "@/shared/components/Button";
import { Author } from "../api/dto/global-feed.in";
import { useLazyFollowAuthorQuery } from "@modules/profile/api/repository";

interface FollowButtonProps {
  username: string;
  isFollowing: boolean;
}

const FollowButton: FC<FollowButtonProps> = ({ username, isFollowing }) => {
  const [triggerFavoriteArticleQuery] = useLazyFollowAuthorQuery();

  return (
    <Button
      btnStyle="LIGHT"
      variant="OUTLINE"
      onClick={() => triggerFavoriteArticleQuery({ username, isFollowing })}
    >
      <AiOutlinePlus className="inline" /> {isFollowing ? "Unfollow" : "Follow"}{" "}
      {username}
    </Button>
  );
};

export default FollowButton;
