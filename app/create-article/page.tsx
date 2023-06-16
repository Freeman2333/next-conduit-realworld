"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import ArticleForm, { ArticleFormValues } from "@components/ArticleForm";
import { useCreateArticleMutation } from "@/modules/feed/api/repository";

const CreateArticlePage = () => {
  const [trigerCreateArticleMutation] = useCreateArticleMutation();

  const router = useRouter();

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      const response = await trigerCreateArticleMutation(values);
      router.push(`/article/${response.data.article.slug}`);
    } catch (error) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div className="container mx-auto py-14">
      <ArticleForm onSubmit={onSubmit}></ArticleForm>
    </div>
  );
};

export default CreateArticlePage;
