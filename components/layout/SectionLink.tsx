"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * On the home page: a plain hash link (Lenis smooth-scrolls it with the nav offset).
 * Elsewhere: a localized link back to the home section.
 */
export function SectionLink({
  hash,
  className,
  children,
  onClick,
  ...rest
}: {
  hash: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "true" | undefined;
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link
      href={{ pathname: "/", hash }}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
