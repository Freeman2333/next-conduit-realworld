import React, { FC, ComponentProps } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import ArticleAuthor from "@modules/feed/components/ArticleAuthor";
import { FeedArticle } from "../api/dto/global-feed.in";
import FollowButton from "./FollowButton";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Button } from "@/shared/components/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteArticleMutation } from "@/modules/feed/api/repository";

interface ArticleBannerProps {
  article: FeedArticle;
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>["nameStyle"];
}

const ArticleMeta: FC<ArticleBannerProps> = ({ article, authorNameStyle }) => {
  const { user } = useAuth();
  const router = useRouter();

  const isMyArticle = article.author.username === user?.username;

  const [triggerDeleteArticleMutation] = useDeleteArticleMutation();

  const deleteArticle = async () => {
    try {
      await triggerDeleteArticleMutation({
        articleSlug: article.slug
      }).unwrap();
      router.push(`/`);
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <ArticleAuthor
        author={article.author}
        createdAt={article.createdAt}
        nameStyle={authorNameStyle}
      />
      {isMyArticle ? (
        <>
          <Link href={`/edit-article/${article.slug}`} className="mr-1">
            <Button>
              <AiOutlineEdit className="inline" /> Edit Article
            </Button>
          </Link>
          <Button btnStyle="DANGER" onClick={deleteArticle}>
            <AiFillDelete className="inline" /> Delete Article
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ArticleMeta;
