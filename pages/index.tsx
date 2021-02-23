import React from 'react';
import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import { Head } from '@/components/Head';
import { client } from '@/contentful/client';
import { ICasesFields } from '@/contentful/types';

export const getStaticProps = async () => {
  const entry = await client.getEntry(process.env.CTFL_MAIN_CASES_ID);
  const fields = entry.fields as ICasesFields;
  const cases = fields.list;

  return {
    props: {
      cases,
      revalidate: 10,
      fallback: true
    }
  };
};

export default function Index({
  cases
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head title="Index" />

      <div data-scroll-section>
        <h1>Index</h1>
        <Link href="/black">Go to black page</Link>

        {cases.map((c) => (
          <p key={c.sys.id}>{c.fields.title}</p>
        ))}
      </div>
    </>
  );
}
