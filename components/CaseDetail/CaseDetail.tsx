import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { ICase, ICaseFields } from '@/contentful/types';
import { disableDarkmode } from '@/store/darkmode';
import { ContentfulImage } from '@/components/ContentfulImage';

import { CaseStories } from '@/components/CaseDetail/CaseStories/CaseStories';
import cls from '@/components/CaseDetail/CaseDetail.module.sass';

interface PropsI {
  data: ICase;
}

export function CaseDetail({ data }: PropsI): JSX.Element {
  const dispatch = useDispatch();
  const fields = useMemo<ICaseFields>(() => data.fields, [data]);
  const hasStories = useMemo<boolean>(
    () => fields.stories && fields.stories.length > 1,
    [fields]
  );

  useEffect(() => {
    dispatch(disableDarkmode());
  }, []);

  return (
    <div className={cls.wrapper}>
      <article>
        <h1
          className={cn('t-h1', cls.title, {
            [cls.title_right]: fields.makeTitleRight
          })}
        >
          {fields.title}
        </h1>

        <div className={cn(cls.image, cls.cover)}>
          <ContentfulImage img={fields.cover} />

          {hasStories && (
            <CaseStories
              stories={fields.stories}
              onClick={() => console.log('show stories')}
            />
          )}
        </div>
      </article>
    </div>
  );
}

CaseDetail.displayName = 'CaseDetail';
