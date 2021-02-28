/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface PropsI extends LinkProps {
  children: React.ReactElement;
}

export function NavLink({ children, href, ...props }: PropsI): JSX.Element {
  const router = useRouter();
  const isActive = useMemo(() => router.pathname === href, [
    href,
    router.pathname
  ]);

  return (
    <Link href={href} {...props}>
      {isActive
        ? React.cloneElement(children, { 'data-active': true })
        : children}
    </Link>
  );
}
