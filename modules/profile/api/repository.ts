import { createApi } from "@reduxjs/toolkit/query/react";

import { realWorldBaseQuery } from "@/baseQuery";
import { Author } from "@modules/feed/api/dto/global-feed.in";
import { replaceCachedProfile } from "./utils";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    followAuthor: builder.query<{ profile: Author }, { author: Author }>({
      query: ({ author }) => {
        return {
          url: `/profiles/${author.username}/follow`,
          method: author.following ? "DELETE" : "POST",
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedProfile(
          getState,
          queryFulfilled,
          dispatch,
          profileApi
        );
      },
    }),
  }),
});

export const { useLazyFollowAuthorQuery } = profileApi;
