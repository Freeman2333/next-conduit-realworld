import { createApi } from '@reduxjs/toolkit/query/react';

import { realWorldBaseQuery } from '@/baseQuery';
import { SignUpInDTO } from '@modules/auth/api/dto/sign-up.in';
import { SignInOutDTO } from '@modules/auth/api/dto/sign-in.out';
import { SignUpOutDTO } from '@modules/auth/api/dto/sign-up.out';

interface SignUpParams {
  username: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.query<SignUpInDTO, SignUpParams>({
      query: (args) => {
        const data: SignUpOutDTO = {
          user: args,
        };

        return {
          url: '/users',
          method: 'post',
          data,
        };
      },
    }),
    signIn: builder.query<SignUpInDTO, SignInParams>({
      query: (args) => {
        const data: SignInOutDTO = {
          user: args,
        };

        return {
          url: '/users/login',
          method: 'post',
          data,
        };
      },
    }),
  }),
});

export const { useLazySignUpQuery, useLazySignInQuery } = authApi;
