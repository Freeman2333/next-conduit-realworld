import { FC } from "react";
import { useSearchParams } from "next/navigation";

import { NavLink } from "@components/Navlink";

interface FeedToggleItem {
  text: string;
  link: string;
}

interface FeedToggleProps {
  defaultText?: string;
  defaultLink?: string;
  items?: FeedToggleItem[];
}

const FeedToggler: FC<FeedToggleProps> = ({
  defaultText = "Global Feed",
  defaultLink = "/",
  items = [],
}) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return (
    <div className="flex gap-3">
      <NavLink href={defaultLink} activeGreen notActive={!!tag}>
        {defaultText}
      </NavLink>
      {items.map((item) => (
        <NavLink href={item.link} activeGreen key={item.link}>
          {item.text}
        </NavLink>
      ))}
      {tag && (
        <span className="bg-white border-b-2 border-conduit-green py-2 px-4 text-conduit-green">
          # {tag}
        </span>
      )}
    </div>
  );
};

export default FeedToggler;
