import { FC } from 'react';
import { AiFillHeart } from 'react-icons/ai';

import { Button } from '@components/Button';
import { useLazyFavoriteArticleQuery } from '@modules/feed/api/repository';

interface FavoriteButtonProps {
  favoritesCount: number;
  favorited: boolean;
  slug: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ favorited, favoritesCount, slug }) => {
  const [triggerFavoriteArticleQuery] = useLazyFavoriteArticleQuery();

  const handleFavoriteArticle = () => {
    const action = favorited ? 'unfavorite' : 'favorite';
    triggerFavoriteArticleQuery({ slug, action });
  };
  return (
    <Button btnStyle="GREEN" variant={favorited ? 'BASE' : 'OUTLINE'} onClick={handleFavoriteArticle}>
      <AiFillHeart className="inline-block mr-1" />
      <span>{favoritesCount}</span>
    </Button>
  );
};

export default FavoriteButton;
