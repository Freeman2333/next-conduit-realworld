import { createApi } from "@reduxjs/toolkit/query/react";

import { realWorldBaseQuery } from "@/baseQuery";
import { Author } from "@modules/feed/api/dto/global-feed.in";
import { replaceCachedProfile } from "./utils";
import { SignUpInDTO } from "@/modules/auth/api/dto/sign-up.in";
import { setUser } from "@modules/auth/service/slice";

export interface ProfileParams {
  username: string;
}

export interface FollowProfileParams extends ProfileParams {
  isFollowing: boolean;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    followAuthor: builder.query<{ profile: Author }, FollowProfileParams>({
      query: ({ username, isFollowing }) => {
        return {
          url: `/profiles/${username}/follow`,
          method: isFollowing ? "DELETE" : "POST",
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
    getUser: builder.query<{ profile: Author }, ProfileParams>({
      query: ({ username }) => {
        return {
          url: `/profiles/${username}`,
        };
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

export const {
  useLazyFollowAuthorQuery,
  useUpdateUserMutation,
  useGetUserQuery,
} = profileApi;
