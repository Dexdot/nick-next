import React from 'react';
import { InferGetStaticPropsType } from 'next';

import { Main } from '@/components/Main/Main';
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
  return <Main title="Index" cases={cases} />;
}
