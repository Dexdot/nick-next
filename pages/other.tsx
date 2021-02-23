import React from 'react';
import Link from 'next/link';
import { Head } from '@/components/Head';

export default function Other(): JSX.Element {
  return (
    <>
      <Head title="Other" />
      <h2>This is H2</h2>

      <Link href="/">
        <a href="/">Go to home page</a>
      </Link>
    </>
  );
}
