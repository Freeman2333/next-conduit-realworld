import React, { FC } from 'react';
import { FieldErrorsImpl } from 'react-hook-form';

interface ErrorsListProps {
  errors: Partial<FieldErrorsImpl<any>>;
}

const ErrorsList: FC<ErrorsListProps> = ({ errors }) => {
  return (
    <ul className="list-disc pl-10">
      {Object.keys(errors || []).map((err) => {
        return (
          <li className="text-conduit-red font-bold" key={err}>
            {errors[err].message}
          </li>
        );
      })}
    </ul>
  );
};

export default ErrorsList;
