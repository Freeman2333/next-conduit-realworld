import React, { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";

import TextArea from "@components/TextArea";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Button } from "@/shared/components/Button";
import { useCreateCommentMutation } from "@/modules/feed/api/repository";
import { toast } from "react-toastify";

interface CommentFormProps {
  slug: string;
}

interface NewCommentFormValues {
  comment: string;
}

const validationSchema = yup.object({
  comment: yup.string().required(),
});

const CommentForm: FC<CommentFormProps> = ({ slug }) => {
  const auth = useAuth();

  const [triggerCreateComment] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<{
    comment: string;
  }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: NewCommentFormValues) => {
    try {
      await triggerCreateComment({
        articleSlug: slug,
        comment: values.comment,
      });
      reset();
    } catch (error) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <form
      className="border border-black/15 mb-5 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea
        placeholder="write a comment..."
        {...register("comment")}
        noBorder
      />
      <div className="flex f-width justify-between py-3 px-5 bg-conduit-gray-150">
        <img
          src={auth.user.image}
          alt={auth.user.username}
          className="rounded-full w-8 h-8"
        />
        <Button btnStyle="GREEN" disabled={isSubmitting}>
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
