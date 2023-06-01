import React from 'react';

import { NavLink } from '@components/Navlink';

const FeedToggler = () => {
  return (
    <div className="flex border-b gap-3">
      <NavLink href="/" activeGreenBorder>
        Global Feed
      </NavLink>
      <NavLink href="/personal-feed" activeGreenBorder>
        Your Feed
      </NavLink>
    </div>
  );
};

export default FeedToggler;
