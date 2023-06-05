"use client";
import ReactPaginate from "react-paginate";

import { useGetGlobalFeedQuery } from "@modules/feed/api/repository";
import FeedToggler from "@modules/feed/components/FeedToggler";
import Feed from "@modules/feed/components/Feed";
import { usePageParam } from "@modules/feed/hooks/use-page-param-hook";
import { useSearchParams } from "next/navigation";

import { FEED_PAGE_SIZE } from "@modules/feed/consts";
import TagCloud from "@/modules/feed/components/TagCloud";

export default function Home() {
  const searchParams = useSearchParams();
  const { page, setPage } = usePageParam();

  const { data, isLoading } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get("tag"),
  });

  return (
    <main className="mx-auto container">
      <FeedToggler />
      <div className="flex pb-12 gap-5">
        <div className="w-3/4">
          <Feed data={data} isLoading={isLoading} />
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
          />
        </div>
        <div className="w-1/4">
          <TagCloud />
        </div>
      </div>
    </main>
  );
}
