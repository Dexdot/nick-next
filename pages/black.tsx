import React from 'react';
import { InferGetStaticPropsType } from 'next';

import { Main } from '@/components/Main/Main';
import { client } from '@/contentful/client';
import { ICasesFields } from '@/contentful/types';

export const getStaticProps = async () => {
  const entry = await client.getEntry(process.env.CTFL_BLACK_CASES_ID);
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

export default function Black({
  cases
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <Main title="Black" cases={cases} shouldEnableDarkmode />;
}
