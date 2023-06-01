'use client';
import { useGetGlobalFeedQuery } from '@modules/feed/api/repository';
import FeedToggler from '@modules/feed/components/FeedToggler';
import Feed from '@modules/feed/components/Feed';
export default function Home() {
  const { data, isLoading } = useGetGlobalFeedQuery();
  if (isLoading) {
    return 'loading';
  }
  return (
    <main className="mx-auto container flex">
      <div className="w-3/4">
        <FeedToggler />
        <Feed data={data} />
      </div>
      <div className="w-1/4">dsad </div>
    </main>
  );
}
