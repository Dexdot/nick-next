import React from 'react';
import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';

import { Head } from '@/components/Head';
import { CaseDetail } from '@/components/CaseDetail/CaseDetail';

import { client } from '@/contentful/client';
import { ICase } from '@/contentful/types';

export const getStaticPaths: GetStaticPaths = async () => {
  const entry = await client.getEntries({
    content_type: 'case'
  });
  const cases = entry.items as ICase[];
  const paths = cases
    .filter((c) => !c.fields.soon)
    .map((c) => ({ params: { slug: c.fields.slug } }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const { slug } = params;
  const entry = await client.getEntries({
    content_type: 'case',
    'fields.slug': slug
  });

  const caseData = entry.items[0] as ICase;

  return {
    props: {
      caseData,
      revalidate: 10,
      fallback: true
    }
  };
};

export default function CasePage({
  caseData
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { title, subtitle, cover } = caseData.fields;

  return (
    <>
      <Head
        title={title}
        OGTitle={title}
        description={subtitle}
        OGImage={cover.fields.file.url}
      />
      <CaseDetail data={caseData} />
    </>
  );
}
