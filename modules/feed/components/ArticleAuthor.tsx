import { FC } from 'react';

import Link from 'next/link';
import { Author } from '@modules/feed/api/dto/global-feed.in';
import { DateTime } from 'luxon';

interface ArticleAuthorProps {
  author: Author;
  createdAt: string;
}

const ArticleAuthor: FC<ArticleAuthorProps> = ({ author, createdAt }) => {
  console.log(author);
  return (
    <div className="flex gap-3 items-center">
      <Link href={`/@${author.username}`}>
        <img src={author.image} alt={author.username} className="rounded-full" />
      </Link>
      <div className="flex-col flex">
        <Link href={`/@${author.username}`} className="text-conduit-green font-medium">
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
