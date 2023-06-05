import React from "react";
import { useSearchParams } from "next/navigation";

import { NavLink } from "@components/Navlink";

const FeedToggler = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return (
    <div className="flex gap-3">
      <NavLink href="/" activeGreenBorder notActive={!!tag}>
        Global Feed
      </NavLink>
      <NavLink href="/personal-feed" activeGreenBorder>
        Your Feed
      </NavLink>
      {tag && (
        <span className="bg-white border-b-2 border-conduit-green py-2 px-4 text-conduit-green">
          # {tag}
        </span>
      )}
    </div>
  );
};

export default FeedToggler;
