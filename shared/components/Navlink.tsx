import { FC, ReactNode, PropsWithChildren, ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps extends ComponentProps<typeof Link> {
  href: string;
  children: ReactNode;
  notActive?: boolean;
  activeGreen?: boolean;
  className?: ComponentProps<"link">["className"];
}

export const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({
  href,
  children,
  className,
  notActive,
  activeGreen,
  ...props
}) => {
  const pathname = usePathname();

  const isActive = !notActive && pathname === href;
  const navLinkClasses = clsx(
    " hover:no-underline flex gap-1 items-center py-2",
    {
      "text-black/80": isActive,
      "text-black/30": !isActive,
      "hover:text-black/60": !isActive,
      "border-conduit-green border-b-2 text-conduit-green":
        isActive && activeGreen,
    },
    className
  );

  return (
    <Link href={href} className={navLinkClasses} {...props}>
      {children}
    </Link>
  );
};
