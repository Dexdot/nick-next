import React from 'react';
import Link from 'next/link';

interface PropsI {
  url: string;
  soon: boolean;
  children: React.ReactNode;
}

export function CaseLink({ url, soon, children }: PropsI): JSX.Element {
  if (soon) return <span>{children}</span>;

  return (
    <Link href={url}>
      <a href={url}>{children}</a>
    </Link>
  );
}
