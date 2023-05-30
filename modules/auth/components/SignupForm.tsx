'use client';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import Input from '@/shared/components/Input';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import ErrorsList from '@components/ErrorsList';
import { Button } from '@components/Button';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignupForm: FC = () => {
  const { signUp } = useAuth();

  const { register, handleSubmit, formState, control, reset } = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      await signUp(values);
      router.push('/');
    } catch (err) {
      reset(values);
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <form className=" flex flex-col w-full mx-auto gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
      <ErrorsList errors={formState.errors} />
      <Input placeholder="username" {...register('username')} />
      <Input placeholder="email" {...register('email')} />
      <Input placeholder="password" {...register('password')} type="password" />
      <Button btnStyle="GREEN" size="LG" type="submit" disabled={formState.isSubmitting}>
        Sign Up
      </Button>
      {/* <DevTool control={control} /> */}
    </form>
  );
};

export default SignupForm;
