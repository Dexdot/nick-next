import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { IMediaListFields } from '@/contentful/types';
import { client } from '@/contentful/client';

import { BlackList } from '@/components/BlackList/BlackList';

export const getStaticProps: GetStaticProps = async () => {
  const entry = await client.getEntry(process.env.CTFL_BLACK_MEDIA_ID);
  const inner = entry.fields as IMediaListFields;
  const list = inner.media;

  return {
    props: {
      list,
      revalidate: 10,
      fallback: true
    }
  };
};

export default function Black({
  list
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <BlackList list={list} />;
}
