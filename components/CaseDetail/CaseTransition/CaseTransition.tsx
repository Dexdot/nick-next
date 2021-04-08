import React from 'react';
import cn from 'classnames';

import type { ICase } from '@/contentful/types';
import { ContentfulImage } from '@/components/ContentfulImage';
import { getStyleRatio } from '@/utils/utils';

import clsDetail from '@/components/CaseDetail/CaseDetail.module.sass';
import cls from './CaseTransition.module.sass';

interface PropsI {
  nextCase: ICase;
}

export function CaseTransition({ nextCase }: PropsI): JSX.Element {
  return (
    <div className={cls.container}>
      <div className={cls.nextcase}>
        <div className={clsDetail.wrapper}>
          <h1
            className={cn('t-h1', clsDetail.title, {
              [clsDetail.title_right]: nextCase.fields.makeTitleRight
            })}
            data-transition="next-title-to"
          >
            <span>{nextCase.fields.title}</span>
          </h1>

          <div
            className={cn(clsDetail.image, clsDetail.cover)}
            style={getStyleRatio(nextCase.fields.cover)}
            data-transition="next-image-to"
          >
            <ContentfulImage img={nextCase.fields.cover} />
          </div>
        </div>
      </div>

      <div className={cls.movable_title} data-transition="movable-title">
        <h1
          className={cn('t-h1', clsDetail.title, {
            [clsDetail.title_right]: nextCase.fields.makeTitleRight
          })}
        >
          <span>{nextCase.fields.title}</span>
        </h1>
      </div>

      <div className={cls.movable_image} data-transition="movable-image">
        <ContentfulImage img={nextCase.fields.cover} />
      </div>
    </div>
  );
}
