import { FC } from "react";
import Link from "next/link";

import { FeedArticle } from "@modules/feed/api/dto/global-feed.in";
import ArticleAuthor from "@modules/feed/components/ArticleAuthor";
import FavoriteButton from "@modules/feed/components/FavoriteButton";
import TagList from "@modules/feed/components/TagList";

const Article: FC<FeedArticle> = ({
  author,
  createdAt,
  slug,
  title,
  description,
  favoritesCount,
  favorited,
  tagList,
}) => {
  return (
    <div className="py-6 border-t border-black/10">
      <div className="flex justify-between mb-3">
        <ArticleAuthor author={author} createdAt={createdAt} />
        <FavoriteButton
          favoritesCount={favoritesCount}
          favorited={favorited}
          slug={slug}
        />
      </div>
      <Link href={`article/${slug}`}>
        <h1 className="mb-1 font-semibold text-2xl text-conduit-gray-1000">
          {title}
        </h1>
        <p className="text-conduit-gray-700 font-light mb-1">{description}</p>
        <div className="flex justify-between font-light text-conduit-gray-500 text-date">
          <span>Read more...</span>
          <TagList tagList={tagList} />
        </div>
      </Link>
    </div>
  );
};

export default Article;
