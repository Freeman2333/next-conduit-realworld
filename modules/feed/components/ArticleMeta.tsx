import React, { FC, ComponentProps } from "react";

import ArticleAuthor from "@modules/feed/components/ArticleAuthor";
import { FeedArticle } from "../api/dto/global-feed.in";
import FollowButton from "./FollowButton";
import FavoriteButton from "./FavoriteButton";

interface ArticleBannerProps {
  article: FeedArticle;
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>["nameStyle"];
}

const ArticleMeta: FC<ArticleBannerProps> = ({ article, authorNameStyle }) => {
  return (
    <div className="flex gap-3">
      <ArticleAuthor
        author={article.author}
        createdAt={article.createdAt}
        nameStyle={authorNameStyle}
      />
      <FollowButton
        username={article.author.username}
        isFollowing={article.author.following}
      />
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
