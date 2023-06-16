"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import Feed from "@/modules/feed/components/Feed";
import TagCloud from "@/modules/feed/components/TagCloud";
import FeedToggler from "@modules/feed/components/FeedToggler";

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  const feedToogleItems = [];
  if (isLoggedIn) {
    feedToogleItems.push({
      text: "Your feed",
      link: "/personal-feed",
    });
  }

  return (
    <main className="mx-auto container">
      <div className="flex pb-12 gap-5">
        <div className="w-3/4">
          <FeedToggler items={feedToogleItems} />
          <Feed />
        </div>
        <div className="w-1/4">
          <TagCloud />
        </div>
      </div>
    </main>
  );
}
