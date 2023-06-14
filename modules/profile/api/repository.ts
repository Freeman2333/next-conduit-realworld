import { createApi } from "@reduxjs/toolkit/query/react";

import { realWorldBaseQuery } from "@/baseQuery";
import { Author } from "@modules/feed/api/dto/global-feed.in";
import { replaceCachedProfile } from "./utils";
import { SignUpInDTO } from "@/modules/auth/api/dto/sign-up.in";
import { setUser } from "@modules/auth/service/slice";

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
    updateUser: builder.mutation<SignUpInDTO, any>({
      query: (data) => {
        return {
          url: "/user",
          method: "put",
          data: { user: data },
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        await dispatch(setUser(data.user));
      },
    }),
  }),
});

export const { useLazyFollowAuthorQuery, useUpdateUserMutation } = profileApi;
