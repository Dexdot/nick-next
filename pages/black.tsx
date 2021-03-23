import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { IBlackListFields } from '@/contentful/types';
import { client } from '@/contentful/client';

import { Head } from '@/components/Head';
import { BlackList } from '@/components/BlackList/BlackList';

export const getStaticProps: GetStaticProps = async () => {
  const entry = await client.getEntry(process.env.CTFL_BLACK_MEDIA_ID);
  const field = entry.fields as IBlackListFields;

  return {
    props: {
      list: field.list,
      revalidate: 10,
      fallback: true
    }
  };
};

export default function Black({
  list
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head title="Black" />
      <BlackList list={list} />
    </>
  );
}
