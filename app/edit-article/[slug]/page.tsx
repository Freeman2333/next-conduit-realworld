"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import ArticleForm, { ArticleFormValues } from "@components/ArticleForm";
import { useEditArticleMutation } from "@/modules/feed/api/repository";
import { useGetArticleQuery } from "@/modules/feed/api/repository";

const EditArticlePage = () => {
  const { slug } = useParams();
  const { data } = useGetArticleQuery({
    slug,
  });
  const [trigerEditArticleMutation] = useEditArticleMutation();


  const router = useRouter();
  

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      const response = await trigerEditArticleMutation({...values, slug});
      router.push(`/article/${response.data.article.slug}`);
    } catch (error) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  if (!data) {
    return "article not found";
  }

  return (
    <div className="container mx-auto py-14">
      <ArticleForm onSubmit={onSubmit} article={data.article}></ArticleForm>
    </div>
  );
};

export default EditArticlePage;
