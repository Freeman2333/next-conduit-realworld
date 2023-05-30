'use client';
import clsx from 'clsx';
import React from 'react';
import { ComponentProps, forwardRef } from 'react';

interface InputProps {
  placeholder: ComponentProps<'input'>['placeholder'];
  name: ComponentProps<'input'>['name'];
  onChange: ComponentProps<'input'>['onChange'];
  onBlur: ComponentProps<'input'>['onBlur'];
  type?: ComponentProps<'input'>['type'];
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({ ...inputProps }, ref) => {
  const inputClasses = clsx('border border-black/15   text-xl py-4 px-5 rounded-md w-full');
  return <input ref={ref} {...inputProps} className={inputClasses} />;
});

export default Input;
