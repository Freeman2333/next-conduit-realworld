import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { realWorldBaseQuery } from '@/baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.query<any, any>({
      query: (args) => {
        const data: any = {
          user: args,
        };

        return {
          url: '/users',
          method: 'post',
          data,
        };
      },
    }),
  }),
});

export const { useLazySignUpQuery } = authApi;
