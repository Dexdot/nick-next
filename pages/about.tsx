import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import type { IAboutFields } from '@/contentful/types';
import { client } from '@/contentful/client';
import { createMobileAboutText } from '@/utils/utils';
import { About } from '@/components/About/About';
import { Head } from '@/components/Head';

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'about' });
  const data = response.items[0].fields as IAboutFields;
  const mobileText = createMobileAboutText(data.text.content);

  return {
    props: {
      data,
      mobileText,
      revalidate: 10,
      fallback: true
    }
  };
};

export default function AboutPage({
  data,
  mobileText
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head title="About" />
      <About data={data} mobileText={mobileText} />
    </>
  );
}
