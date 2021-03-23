import React from 'react';
import NextHead from 'next/head';

interface PropsI {
  title: string;
  keywords?: string;
  OGTitle?: string;
  OGImage?: string;
  description?: string;
  robots?: string;
}

export function Head({
  title,
  OGTitle,
  OGImage,
  description,
  keywords,
  robots
}: PropsI): JSX.Element {
  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />

      <title>{title} | Nick Adams</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />

      {/* OG */}
      <meta property="og:title" content={OGTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nickadams.online/" />
      <meta property="og:site_name" content="Nick Adams" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image" content={OGImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={OGTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OGImage} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="msapplication-TileImage"
        content="/favicon/apple-touch-icon.png"
      />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

      {/* Links */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
    </NextHead>
  );
}

Head.defaultProps = {
  keywords:
    'nick adams, nickadams, stereocage, designer, art director, web design',
  OGTitle: 'Nick Adams',
  OGImage: '/favicon/nickadams.png',
  description: 'Digital designer & art director from St. Petersburg',
  robots: 'index, follow'
};
