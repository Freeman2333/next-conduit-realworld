import { FC } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useParams } from "next/navigation";

import { useGetGlobalFeedQuery } from "@modules/feed/api/repository";
import Article from "@modules/feed/components/Article";
import { usePageParam } from "@modules/feed/hooks/use-page-param-hook";
import { FEED_PAGE_SIZE } from "@modules/feed/consts";

const Feed: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { author } = useParams();

  const { page, setPage } = usePageParam();

  const isFavaritedTab = pathname.includes("favorites");

  const { data, isLoading, isFetching, error } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get("tag"),
    isPersonalFeed: pathname === "/personal-feed",
    author: author && decodeURIComponent(author),
    favorited: isFavaritedTab ? decodeURIComponent(author) : undefined,
  });

  if (isLoading) {
    return "loading";
  }

  if (isLoading || isFetching) {
    return <p className="mt-4">Feed loading...</p>;
  }

  if (error) {
    return <p className="mt-4">Error while loading feed</p>;
  }

  if (!data || data.articlesCount === 0) {
    return <p className="mt-4">No articles are here... yet.</p>;
  }

  return (
    <div>
      {data.articles.map((article) => {
        return <Article {...article} key={article.slug} />;
      })}
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        pageCount={Math.ceil((data?.articlesCount || 0) / FEED_PAGE_SIZE)}
        pageRangeDisplayed={Math.ceil(
          (data?.articlesCount || 0) / FEED_PAGE_SIZE
        )}
        onPageChange={({ selected }) => setPage(selected)}
        containerClassName={"flex justify-start py-5"}
        activeClassName={"active group"}
        pageClassName={"group"}
        pageLinkClassName={
          "p-3 text-conduit-green bg-white border border-conduit-gray-300 -ml-px group-[&:nth-child(2)]:rounded-l group-[&:nth-last-child(2)]:rounded-r hover:bg-conduit-gray-200"
        }
        activeLinkClassName="group-[.active]:bg-conduit-green group-[.active]:text-white group-[.active]:border-conduit-green"
        forcePage={page}
      />
    </div>
  );
};

export default Feed;
