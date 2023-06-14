import { FC } from "react";

import ArticleMeta from "@modules/feed/components/ArticleMeta";
import { FeedArticle } from "../api/dto/global-feed.in";

interface ArticleBannerProps {
  article: FeedArticle;
}

const ArticleBanner: FC<ArticleBannerProps> = ({ article }) => {
  return (
    <div className="w-full bg-conduit-gray-1100 py-6 text-white">
      <div className="container mx-auto">
        <h1 className="text-white text-articleTitle font-semibold leading-articleTitle mb-8">
          {article.title}
        </h1>
        <ArticleMeta article={article} authorNameStyle="LIGHT" />
      </div>
    </div>
  );
};

export default ArticleBanner;
