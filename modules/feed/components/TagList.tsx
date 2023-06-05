import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";

enum TagListStyle {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

interface TagListProps {
  tagList: string[];
  itemStyle?: keyof typeof TagListStyle;
  itemAs?: "li" | "a";
}

const TagList: FC<TagListProps> = ({ tagList, itemAs = "li", itemStyle }) => {
  const tagClasses = clsx(
    "font-light text-date border mr-1 mb-0.2 px-tag rounded-tag",
    {
      "border-conduit-gray-300 text-conduit-gray-600":
        itemStyle === TagListStyle.LIGHT,
      "bg-conduit-gray-800 text-white border-conduit-gray-800 hover:bg-conduit-gray-900":
        itemStyle === TagListStyle.DARK,
      "hover:text-white hover:no-underline":
        itemStyle === TagListStyle.DARK && itemAs === "a",
    }
  );
  return (
    <ul className="flex flex-wrap gap-1 ">
      {tagList.map((tag) =>
        itemAs === "li" ? (
          <li key={tag} className={tagClasses}>
            {tag}
          </li>
        ) : (
          <Link key={tag} href={`/?tag=${tag}`} className={tagClasses}>
            {tag}
          </Link>
        )
      )}
    </ul>
  );
};

export default TagList;
