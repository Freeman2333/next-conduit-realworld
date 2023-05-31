import { FC, ReactNode, PropsWithChildren, ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLinkProps extends ComponentProps<typeof Link> {
  href: string;
  children: ReactNode;
  exact?: boolean;
  notActive?: boolean;
  className?: ComponentProps<'link'>['className'];
}

export const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({
  href,
  exact,
  children,
  className,
  notActive,
  ...props
}) => {
  const pathname = usePathname();

  const isActive = !notActive && pathname.startsWith(href);
  console.log({ isActive, children });
  const navLinkClasses = clsx(
    ' hover:no-underline flex gap-1 items-center',
    {
      'text-black/80': isActive,
      'text-black/30': !isActive,
      'hover:text-black/60': !isActive,
    },
    className,
  );

  return (
    <Link href={href} className={navLinkClasses} {...props}>
      {children}
    </Link>
  );
};
