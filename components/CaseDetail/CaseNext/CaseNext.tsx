import React from 'react';
import cn from 'classnames';

import { ContentfulImage } from '@/components/ContentfulImage';
import type { ICase } from '@/contentful/types';

import cls from './CaseNext.module.sass';

interface PropsI {
  nextCase: ICase;
}

export function CaseNext({ nextCase }: PropsI): JSX.Element {
  return (
    <section className={cls.container} data-transition="next-container">
      <div className={cls.inner}>
        <h2 className={cn('t-h1', cls.title)} data-transition="next-title-from">
          {nextCase.fields.title}
        </h2>
        <p>{nextCase.fields.subtitle}</p>
        <ContentfulImage
          className={cn('next-image-from', cls.image)}
          img={nextCase.fields.cover}
        />
      </div>
    </section>
  );
}
