"use client";
import clsx from "clsx";
import React from "react";
import { ComponentProps, forwardRef } from "react";

enum InputSize {
  SM = "SM",
  BASE = "BASE",
}

interface InputProps {
  placeholder: ComponentProps<"input">["placeholder"];
  name: ComponentProps<"input">["name"];
  onChange: ComponentProps<"input">["onChange"];
  onBlur: ComponentProps<"input">["onBlur"];
  type?: ComponentProps<"input">["type"];
  size?: keyof typeof InputSize;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = InputSize.BASE, ...inputProps }, ref) => {
    const inputClasses = clsx(
      "border border-black/15   text-xl rounded-md w-full",
      {
        "py-3 px-6 text-xl": size === InputSize.BASE,
        "py-2 px-3 text-base": size === InputSize.SM,
      }
    );
    return <input ref={ref} {...inputProps} className={inputClasses} />;
  }
);

export default Input;
