import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { DateTime } from "luxon";

import { Author } from "@modules/feed/api/dto/global-feed.in";

export enum NameStyleEnum {
  GREEN = "GREEN",
  LIGHT = "LIGHT",
}

interface ArticleAuthorProps {
  author: Author;
  createdAt: string;
  nameStyle?: keyof typeof NameStyleEnum;
}

const ArticleAuthor: FC<ArticleAuthorProps> = ({
  author,
  createdAt,
  nameStyle = NameStyleEnum.GREEN,
}) => {
  const usernameClasses = clsx("font-medium", {
    "text-conduit-green": nameStyle === NameStyleEnum.GREEN,
    "text-white hover:text-white": nameStyle === NameStyleEnum.LIGHT,
  });
  return (
    <div className="flex gap-3 items-center">
      <Link href={`/${author.username}`}>
        <img
          src={author.image}
          alt={author.username}
          className="rounded-full h-8 w-8"
        />
      </Link>
      <div className="flex-col flex">
        <Link href={`/${author.username}`} className={usernameClasses}>
          {author.username}
        </Link>
        <span className="text-conduit-gray-500 text-date">
          {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
        </span>
      </div>
    </div>
  );
};

export default ArticleAuthor;
