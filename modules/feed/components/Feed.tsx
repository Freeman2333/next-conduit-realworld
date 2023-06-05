import { FC } from "react";
import { FeedData } from "@modules/feed/api/repository";
import Article from "@modules/feed/components/Article";

interface FeedProps {
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  data?: FeedData;
}

const Feed: FC<FeedProps> | string = ({ data, isLoading }) => {
  if (isLoading) {
    return "loading";
  }

  const { articlesCount, articles } = data;

  return (
    <div>
      {articles.map((article) => {
        return <Article {...article} key={article.slug} />;
      })}
    </div>
  );
};

export default Feed;
