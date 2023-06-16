import { createApi } from "@reduxjs/toolkit/query/react";

import { realWorldBaseQuery } from "@/baseQuery";
import { FeedArticle } from "@modules/feed/api/dto/global-feed.in";
import {
  transformResponse,
  replaceCachedArticle,
  addNewCommentToCache,
  removeCommentFromCache,
} from "@modules/feed/api/utils";
import { FEED_PAGE_SIZE } from "@modules/feed/consts";
import { NewCommentInDTO } from "@modules/feed/api/dto/new-comment.in";
import { NewCommentOutDTO } from "@modules/feed/api/dto/new-comment.out";
import { ArticleCommentsInDTO } from "@modules/feed/api/dto/article-comments.in";

interface BaseFeedParams {
  page: number;
}

export interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
  isPersonalFeed: boolean;
  author?: string;
  favorited?: string;
}

export interface favoriteArticleParams {
  slug: string;
  action: "favorite" | "unfavorite";
}

interface CreateCommentParams {
  articleSlug: string;
  comment: string;
}

interface DeleteCommentParams {
  articleSlug: string;
  commentId: number;
}

interface SingleArticleParams {
  slug: string;
}

export interface FeedData {
  articles: FeedArticle[];
  articlesCount: number;
}

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
      query: ({ page, tag, isPersonalFeed, author, favorited }) => {
        return {
          url: isPersonalFeed ? "/articles/feed" : "/articles",
          method: "get",
          params: {
            offset: page * FEED_PAGE_SIZE,
            limit: FEED_PAGE_SIZE,
            tag,
            author: favorited ? undefined : author,
            favorited,
          },
        };
      },
      transformResponse,
    }),
    getTags: builder.query<{ tags: string[] }, {}>({
      query: () => {
        return {
          url: "/tags",
        };
      },
    }),
    getComments: builder.query<ArticleCommentsInDTO, SingleArticleParams>({
      query: ({ slug }) => {
        return {
          url: `/articles/${slug}/comments`,
        };
      },
    }),
    getArticle: builder.query<{ article: FeedArticle }, { slug: string }>({
      query: ({ slug }) => {
        return {
          url: `/articles/${slug}`,
        };
      },
    }),
    favoriteArticle: builder.query<FeedArticle, favoriteArticleParams>({
      query: ({ slug, action }) => {
        const method = action === "favorite" ? "post" : "delete";
        return {
          url: `/articles/${slug}/favorite`,
          method,
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      },
    }),
    // ======================================================
    // mutations
    // ======================================================
    createComment: builder.mutation<NewCommentInDTO, CreateCommentParams>({
      query: ({ articleSlug, comment }) => {
        const data: NewCommentOutDTO = {
          comment: {
            body: comment,
          },
        };
        return {
          url: `/articles/${articleSlug}/comments`,
          method: "post",
          data,
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await addNewCommentToCache(getState, queryFulfilled, dispatch);
      },
    }),
    deleteComment: builder.mutation<any, DeleteCommentParams>({
      query: ({ articleSlug, commentId }) => {
        return {
          url: `/articles/${articleSlug}/comments/${commentId}`,
          method: "delete",
        };
      },
      onQueryStarted: async (
        { commentId },
        { dispatch, queryFulfilled, getState }
      ) => {
        await removeCommentFromCache(getState, queryFulfilled, dispatch, {
          id: commentId,
        });
      },
    }),
  }),
});

export const {
  useGetGlobalFeedQuery,
  useLazyFavoriteArticleQuery,
  useGetTagsQuery,
  useGetArticleQuery,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
} = feedApi;
