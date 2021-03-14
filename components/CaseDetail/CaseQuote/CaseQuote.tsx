import React from 'react';
import cn from 'classnames';

import { ICaseQuoteFields } from '@/contentful/types';

import cls from './CaseQuote.module.sass';

interface PropsI {
  data: ICaseQuoteFields;
}

export function CaseQuote({ data }: PropsI): JSX.Element {
  return (
    <div className={cls.quote}>
      {data.text && (
        <blockquote className={cn('t-h2', cls.text)}>{data.text}</blockquote>
      )}
      <div className={cls.info}>
        {data.author && <p>{data.author}</p>}
        {data.description && <p>{data.description}</p>}
      </div>
    </div>
  );
}

CaseQuote.displayName = 'CaseQuote';
