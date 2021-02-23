// https://nextjs.org/docs/advanced-features/custom-document
// https://nextjs.org/docs/advanced-features/custom-document#typescript

import React from 'react';
import DocumentNext, { Html, Head, Main, NextScript } from 'next/document';

class Document extends DocumentNext {
  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
