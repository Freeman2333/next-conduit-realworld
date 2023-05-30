import Link from 'next/link';
import { Titillium_Web } from '@next/font/google';

import { NavLink } from '@components/Navlink';
import { useAuth } from '@modules/auth/hooks/useAuth';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: '700',
});

const Header = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <div className="mx-auto container flex justify-between py-3 items-center">
      <NavLink href="/" className={`${titillium.className} text-conduit-green text-2xl`} exact>
        conduit
      </NavLink>
      <ul className="flex gap-3">
        <li>
          <NavLink href="/" exact>
            Home
          </NavLink>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <NavLink href="/signin">Sign in</NavLink>
            </li>
            <li>
              <NavLink href="/signup">Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
