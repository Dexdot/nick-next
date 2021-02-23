import React from 'react';
import NextHead from 'next/head';

interface PropsI {
  title: string;
  keywords?: string;
  OGTitle?: string;
  description?: string;
  robots?: string;
}

export function Head({
  title,
  OGTitle,
  description,
  keywords,
  robots
}: PropsI): JSX.Element {
  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={OGTitle} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />

      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
    </NextHead>
  );
}

Head.defaultProps = {
  keywords:
    'nick adams, nickadams, stereocage, designer, art director, web design',
  OGTitle: 'Nick Adams',
  description: 'Digital designer & art director from St. Petersburg',
  robots: 'index, follow'
};
