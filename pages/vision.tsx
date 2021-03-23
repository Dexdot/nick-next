import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { TopLevelBlock } from '@contentful/rich-text-types';

import type { IVisionFields } from '@/contentful/types';
import { client } from '@/contentful/client';
import { splitBlocksByHr } from '@/utils/utils';
import { Vision } from '@/components/Vision/Vision';
import { Head } from '@/components/Head';

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'vision' });
  const data = response.items[0].fields as IVisionFields;
  const slides: TopLevelBlock[][] = splitBlocksByHr(data.text.content);

  return {
    props: {
      slides,
      revalidate: 10,
      fallback: true
    }
  };
};

export default function VisionPage({
  slides
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head title="Vision" />
      <Vision slides={slides} />
    </>
  );
}
