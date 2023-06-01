import { createApi } from '@reduxjs/toolkit/query/react';

import { realWorldBaseQuery } from '@/baseQuery';
import { FeedArticle } from '@modules/feed/api/dto/global-feed.in';
import { transformResponse } from '@modules/feed/api/utils';

interface BaseFeedParams {
  page: number;
}

export interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
  isPersonalFeed: boolean;
}

export interface FeedData {
  articles: FeedArticle[];
  articlesCount: number;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
      query: () => {
        return {
          url: '/articles',
          method: 'get',
        };
      },
      transformResponse,
    }),
  }),
});

export const { useGetGlobalFeedQuery } = feedApi;
