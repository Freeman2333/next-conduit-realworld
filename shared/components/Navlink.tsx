import { FC, ReactNode, PropsWithChildren, ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLinkProps extends ComponentProps<typeof Link> {
  href: string;
  children: ReactNode;
  exact?: boolean;
}

export const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({ href, exact, children, ...props }) => {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);
  console.log({
    pathname,
    href,
    exact,
    isActive,
  });

  const navLinkClasses = clsx({
    'text-black/80': isActive,
    'text-black/30': !isActive,
  });

  return (
    <Link href={href} className={navLinkClasses} {...props}>
      {children}
    </Link>
  );
};
