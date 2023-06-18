"use client";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/shared/components/Input";
import { Button } from "@components/Button";
import TextArea from "./TextArea";
import ErrorsList from "@components/ErrorsList";
import { FeedArticle } from "@modules/feed/api/dto/global-feed.in";

export interface ArticleFormValues {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

interface ArticleFormProps {
  onSubmit: (values: ArticleFormValues) => Promise<void>;
  article?: FeedArticle
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tagList: yup.string(),
});

const ArticleForm: FC<ArticleFormProps> = ({ onSubmit, article }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<ArticleFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    });

  useEffect(() => {
    if (!article) {
      return;
    }
    reset({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList.join(","),
    });
  }, [article, reset]);

  return (
    <form
      className=" flex flex-col w-full mx-auto gap-4 items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ErrorsList errors={formState.errors} />
      <Input placeholder="Article title" {...register("title")} />
      <Input
        placeholder="What's this article about?"
        size="SM"
        {...register("description")}
      />
      <TextArea
        placeholder="Write your article (in markdown)"
        rows={5}
        {...register("body")}
      />
      <Input placeholder="Enter tags" {...register("tagList")} size="SM" />
      <Button
        btnStyle="GREEN"
        size="LG"
        type="submit"
        disabled={formState.isSubmitting}
      >
        Publish Article
      </Button>
      {/* <DevTool control={control} /> */}
    </form>
  );
};

export default ArticleForm;
