import React from 'react';
import Link from 'next/link';
import { Head } from '@/components/Head';

export default function Home(): JSX.Element {
  return (
    <>
      <Head title="Index" />
      <h1>This is H1</h1>
      <Link href="/other">
        <a href="/other">Go to other page</a>
      </Link>
    </>
  );
}
