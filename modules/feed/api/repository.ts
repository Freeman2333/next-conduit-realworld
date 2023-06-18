import { createApi } from "@reduxjs/toolkit/query/react";

import { realWorldBaseQuery } from "@/baseQuery";
import { FeedArticle } from "@modules/feed/api/dto/global-feed.in";
import {
  transformResponse,
  replaceCachedArticle,
  addNewCommentToCache,
  removeCommentFromCache,
  addNewArticletToCache,
  removeArticleFromCache
} from "@modules/feed/api/utils";
import { FEED_PAGE_SIZE } from "@modules/feed/consts";
import { NewCommentInDTO } from "@modules/feed/api/dto/new-comment.in";
import { NewCommentOutDTO } from "@modules/feed/api/dto/new-comment.out";
import { ArticleCommentsInDTO } from "@modules/feed/api/dto/article-comments.in";
import { CreateArticleInDTO } from "./dto/new-article.in";
import { CreateArticleOutDTO } from "./dto/new-article.out";

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

interface CreateArticleParams {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

interface CreateArticleParams {
  title: string;
  description: string;
  body: string;
  slug: string;
}

interface CreateCommentParams {
  articleSlug: string;
  comment: string;
}

interface DeleteCommentParams {
  articleSlug: string;
  commentId: number;
}

interface DeleteArticleParams {
  articleSlug: string;
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

    EditArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
      query: ({ title, description, body, slug }) => {
        const data: any = {
          article: {
            title,
            description,
            body,
          },
        };
        return {
          url: `/articles/${slug}`,
          method: "put",
          data,
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await addNewArticletToCache(getState, queryFulfilled, dispatch);
      },
    }),
    createArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
      query: ({ title, description, body, tagList }) => {
        const data: CreateArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tagList.split(",").map((tag) => tag.trim()),
          },
        };
        return {
          url: `/articles`,
          method: "post",
          data,
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await addNewArticletToCache(getState, queryFulfilled, dispatch);
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
    deleteArticle: builder.mutation<any, DeleteArticleParams>({
      query: ({ articleSlug }) => {
        return {
          url: `/articles/${articleSlug}`,
          method: "delete",
        };
      },
      onQueryStarted: async (
        { articleSlug },
        { dispatch, queryFulfilled, getState }
      ) => {
        await removeArticleFromCache(getState, queryFulfilled, dispatch, {
          articleSlug,
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
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useDeleteArticleMutation,
} = feedApi;
