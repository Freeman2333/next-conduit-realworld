import { Titillium_Web } from '@next/font/google';

import { NavLink } from '@components/Navlink';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { GiNotebook } from 'react-icons/gi';
import { BsFillGearFill } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: '700',
});

const Header = () => {
  const { isLoggedIn, user, logOut } = useAuth();
  console.log(isLoggedIn);

  return (
    <div className="mx-auto container flex justify-between py-3 items-center">
      <NavLink href="/" className={`${titillium.className} text-conduit-green text-2xl`} exact>
        conduit
      </NavLink>
      <ul className="flex gap-4">
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
        {isLoggedIn && (
          <>
            <li>
              <NavLink href="/editor">
                <GiNotebook />
                New Article
              </NavLink>
            </li>
            <li>
              <NavLink href="/settings">
                <BsFillGearFill />
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink href={`/@${user?.username}`}>
                <BiUserCircle />
                {user?.username}
              </NavLink>
            </li>
            <li onClick={() => logOut()}>
              <NavLink href="/" notActive>
                Log out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
