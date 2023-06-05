import { createApi } from "@reduxjs/toolkit/query/react";

import { realWorldBaseQuery } from "@/baseQuery";
import { FeedArticle } from "@modules/feed/api/dto/global-feed.in";
import {
  transformResponse,
  replaceCachedArticle,
} from "@modules/feed/api/utils";
import { FEED_PAGE_SIZE } from "@modules/feed/consts";

interface BaseFeedParams {
  page: number;
}

export interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
  isPersonalFeed: boolean;
}

export interface favoriteArticleParams {
  slug: string;
  action: "favorite" | "unfavorite";
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
      query: ({ page, tag, isPersonalFeed }) => {
        return {
          url: isPersonalFeed ? "/articles/feed" : "/articles",
          method: "get",
          params: {
            offset: page * FEED_PAGE_SIZE,
            limit: FEED_PAGE_SIZE,
            tag,
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
  }),
});

export const {
  useGetGlobalFeedQuery,
  useLazyFavoriteArticleQuery,
  useGetTagsQuery,
} = feedApi;
