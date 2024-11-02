import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Head } from '@/components/Head';
import { Main } from '@/components/Main/Main';
import { client } from '@/contentful/client';
import { ICasesFields } from '@/contentful/types';

export const getStaticProps: GetStaticProps = async () => {
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

      <Main cases={cases} />
    </>
  );
}
