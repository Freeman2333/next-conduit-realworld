import React, { FC } from "react";

import ArticleAuthor from "@modules/feed/components/ArticleAuthor";
import { FeedArticle } from "../api/dto/global-feed.in";
import FollowButton from "./FollowButton";
import FavoriteButton from "./FavoriteButton";

interface ArticleBannerProps {
  article: FeedArticle;
}

const ArticleMeta: FC<ArticleBannerProps> = ({ article }) => {
  return (
    <div className="flex gap-3">
      <ArticleAuthor
        author={article.author}
        createdAt={article.createdAt}
        nameStyle="LIGHT"
      />
      <FollowButton author={article.author} />
      <FavoriteButton
        favoritesCount={article.favoritesCount}
        favorited={article.favorited}
        slug={article.slug}
        extended
      />
    </div>
  );
};

export default ArticleMeta;
