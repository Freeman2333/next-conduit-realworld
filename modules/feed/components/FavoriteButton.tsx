import { FC } from "react";
import { AiFillHeart } from "react-icons/ai";

import { Button } from "@components/Button";
import { useLazyFavoriteArticleQuery } from "@modules/feed/api/repository";

interface FavoriteButtonProps {
  favoritesCount: number;
  favorited: boolean;
  slug: string;
  extended?: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  favorited,
  favoritesCount,
  slug,
  extended,
}) => {
  const [triggerFavoriteArticleQuery] = useLazyFavoriteArticleQuery();

  const handleFavoriteArticle = () => {
    const action = favorited ? "unfavorite" : "favorite";
    triggerFavoriteArticleQuery({ slug, action });
  };
  return (
    <Button
      btnStyle="GREEN"
      variant={favorited ? "BASE" : "OUTLINE"}
      onClick={handleFavoriteArticle}
    >
      <AiFillHeart className="inline-block mr-1" />
      {extended && "Favorite Article ("}
      <span>{favoritesCount}</span>
      {extended && ")"}
    </Button>
  );
};

export default FavoriteButton;
