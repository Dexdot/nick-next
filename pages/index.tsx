import React from 'react';
import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import { Head } from '@/components/Head';

export const getStaticProps = async () => {
  return {
    props: {
      cases: [1, 2, 3],
      revalidate: 10,
      fallback: true
    }
  };
};

export default function Index({
  cases
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  console.log('cases', cases);

  return (
    <>
      <Head title="Index" />

      <div data-scroll-section>
        <h1>Index</h1>
        <Link href="/black">
          <a href="/black">Go to black page</a>
        </Link>
      </div>
    </>
  );
}
