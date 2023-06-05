import { FC } from "react";
import TagList from "@/modules/feed/components/TagList";
import { useGetTagsQuery } from "@/modules/feed/api/repository";

interface TagCloudProps {}

const TagCloud: FC<TagCloudProps> = () => {
  const { data, isLoading, error, isFetching } = useGetTagsQuery("");

  if (isLoading || isFetching) {
    return (
      <div className="bg-conduit-gray-100 p-3 pt-1.5">
        <p className="mb-2">Loading popular tags...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-conduit-gray-100 p-3 pt-1.5">
        <p className="mb-2">Error while loading popular tags...</p>
      </div>
    );
  }
  return (
    <div className="bg-conduit-gray-100 p-3 pt-1.5">
      <h3 className="mb-2">Popular tags</h3>
      <TagList tagList={data?.tags || []} itemStyle="DARK" itemAs="a" />
    </div>
  );
};

export default TagCloud;
