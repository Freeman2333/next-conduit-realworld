"use client";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Input from "@/shared/components/Input";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import ErrorsList from "@components/ErrorsList";
import { Button } from "@components/Button";
import TextArea from "@/shared/components/TextArea";
import { useUpdateUserMutation } from "@/modules/profile/api/repository";

interface SettingsFormValues {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  username: yup.string().required(),
  bio: yup.string().nullable(),
  image: yup.string().nullable(),
});

const SettingsPage: FC = () => {
  const { user } = useAuth();

  const [trigerUpdateUserMutation] = useUpdateUserMutation();

  const { register, handleSubmit, formState, reset } =
    useForm<SettingsFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        email: user?.email,
        password: "",
        username: user?.username,
        bio: user?.bio,
        image: user?.image,
      },
    });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await trigerUpdateUserMutation(values);
    } catch (err) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div className="container mx-auto py-9">
      <h1 className="text-3xl text-center mb-5"> Your settings</h1>
      <form
        className=" flex flex-col max-w-lg w-full mx-auto gap-4 items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ErrorsList errors={formState.errors} />
        <Input placeholder="image" {...register("image")} />
        <Input placeholder="username" {...register("username")} />
        <TextArea placeholder="Short bio about you..." {...register("bio")} />
        <Input placeholder="email" {...register("email")} />
        <Input
          placeholder="password"
          {...register("password")}
          type="password"
        />
        <Button
          btnStyle="GREEN"
          size="LG"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Update Settings
        </Button>
        {/* <DevTool control={control} /> */}
      </form>
    </div>
  );
};

export default SettingsPage;
