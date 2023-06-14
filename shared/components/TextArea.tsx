"use client";
import clsx from "clsx";
import React from "react";
import { ComponentProps, forwardRef } from "react";

interface TextAreaProps {
  placeholder: ComponentProps<"textarea">["placeholder"];
  name: ComponentProps<"textarea">["name"];
  onChange: ComponentProps<"textarea">["onChange"];
  onBlur: ComponentProps<"textarea">["onBlur"];
  noBorder?: boolean;
}

// eslint-disable-next-line react/display-name
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ noBorder, ...inputProps }, ref) => {
    const inputClasses = clsx(
      "border border-black/15 outline-none   text-xl py-4 px-5 rounded-md w-full",
      {
        "border-0": noBorder,
      }
    );
    return <textarea ref={ref} {...inputProps} className={inputClasses} />;
  }
);

export default TextArea;
