import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { ICase, ICaseFields } from '@/contentful/types';
import { disableDarkmode } from '@/store/darkmode';
import { openModal } from '@/store/modal';
import { setStories } from '@/store/stories';

import { ContentfulImage } from '@/components/ContentfulImage';
import { CaseStories } from '@/components/CaseDetail/CaseStories/CaseStories';
import cls from '@/components/CaseDetail/CaseDetail.module.sass';

interface PropsI {
  data: ICase;
}

export function CaseDetail({ data }: PropsI): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(disableDarkmode());
  }, []);

  const fields = useMemo<ICaseFields>(() => data.fields, [data]);

  // Stories
  const hasStories = useMemo<boolean>(
    () => fields.stories && fields.stories.length > 1,
    [fields]
  );

  const onStoriesClick = useCallback(() => {
    const { stories, title, date, etalon } = fields;
    const payload = {
      title,
      list: stories,
      subtitle: date,
      url: etalon
    };

    dispatch(setStories(payload));
    dispatch(openModal('stories'));
  }, [fields]);

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
            <CaseStories stories={fields.stories} onClick={onStoriesClick} />
          )}
        </div>
      </article>
    </div>
  );
}

CaseDetail.displayName = 'CaseDetail';
