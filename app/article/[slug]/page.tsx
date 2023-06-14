"use client";
import { FC } from "react";
import { useParams } from "next/navigation";

import { useGetArticleQuery } from "@/modules/feed/api/repository";
import ArticleBanner from "@/modules/feed/components/ArticleBanner";
import TagList from "@/modules/feed/components/TagList";
import ArticleMeta from "@modules/feed/components/ArticleMeta";
import Comments from "@/modules/feed/components/Comments";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const convertNewLines = (body: string) => {
  return body.split("\\n").join(" ");
};

const ArticlePage: FC = () => {
  const { slug } = useParams();
  const { isLoggedIn } = useAuth();
  const { data, isLoading, isFetching } = useGetArticleQuery({
    slug,
  });

  if (isLoading || isFetching) {
    return "loading";
  }

  if (!data?.article) {
    return "article not found";
  }

  return (
    <div>
      <ArticleBanner article={data.article} />
      <div className="container mx-auto">
        <p
          className="text-articleBody leading-articleBody py-7"
          dangerouslySetInnerHTML={{
            __html: convertNewLines(data?.article.body),
          }}
        />
        <TagList tagList={data.article.tagList} />
        <div className="border-t py-5 mt-6 flex justify-center">
          <ArticleMeta article={data.article} authorNameStyle="GREEN" />
        </div>
       {isLoggedIn ? <Comments /> : 'you need to log in'}
      </div>
    </div>
  );
};

export default ArticlePage;
