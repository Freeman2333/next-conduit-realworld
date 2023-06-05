import { FC } from "react";
import { FeedData } from "@modules/feed/api/repository";
import Article from "@modules/feed/components/Article";

interface FeedProps {
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  data?: FeedData;
}

const Feed: FC<FeedProps> | string = ({ data, isLoading, isFetching, error }) => {
  if (isLoading) {
    return "loading";
  }

  const { articlesCount, articles } = data;

  if (isLoading || isFetching) {
    return <p className="mt-4">Feed loading...</p>;
  }

  if (error) {
    return <p className="mt-4">Error while loading feed</p>;
  }

  if (articlesCount === 0) {
    return <p className="mt-4">No articles are here... yet.</p>;
  }

  return (
    <div>
      {articles.map((article) => {
        return <Article {...article} key={article.slug} />;
      })}
    </div>
  );
};

export default Feed;
