import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import cn from 'classnames';

import { ICase, ICaseFields } from '@/contentful/types';
import { disableDarkmode, enableDarkmode } from '@/store/darkmode';
import { openModal } from '@/store/modal';
import { setStories } from '@/store/stories';
import { getStyleRatio } from '@/utils/utils';
import { PageFooter } from '@/components/PageFooter';
import { resetNextCaseStyleProps } from '@/transitions/cases';

import cls from '@/components/CaseDetail/CaseDetail.module.sass';
import { ContentfulImage } from '@/components/ContentfulImage';
import { CaseStories } from '@/components/CaseDetail/CaseStories/CaseStories';
import { CaseFooter } from './CaseFooter/CaseFooter';
import { CaseRich } from './CaseRich';
import { CaseNext } from './CaseNext/CaseNext';
import { CaseTransition } from './CaseTransition/CaseTransition';

interface PropsI {
  data: ICase;
  nextCase: ICase;
}

export function CaseDetail({ data, nextCase }: PropsI): JSX.Element {
  // Darkmode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disableDarkmode());
  }, []);

  // Data
  const fields = useMemo<ICaseFields>(() => data.fields, [data]);

  const hasRoles = useMemo<boolean>(
    () => fields.roles && fields.roles.length > 1,
    [fields]
  );

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

  const onCoverLoad = useCallback(() => {
    setTimeout(() => {
      resetNextCaseStyleProps();
    }, 10);
  }, []);

  return (
    <>
      <div data-scroll-section>
        <article className={cls.wrapper} data-transition="case-wrapper">
          <h1
            data-transition="case-title"
            className={cn('t-h1', cls.title, {
              [cls.title_right]: fields.makeTitleRight
            })}
          >
            <span>{fields.title}</span>
          </h1>

          <div
            data-transition="case-cover"
            className={cn(cls.image, cls.cover)}
            style={getStyleRatio(fields.cover)}
          >
            <ContentfulImage
              key={fields.slug}
              img={fields.cover}
              onLoad={onCoverLoad}
            />

            {hasStories && (
              <CaseStories stories={fields.stories} onClick={onStoriesClick} />
            )}
          </div>

          <h2
            data-transition="case-subtitle"
            className={cn('t-h2', cls.subtitle)}
          >
            {fields.subtitle}
          </h2>

          <div className={cls.container}>
            <div className={cls.info_left}>
              <p>{fields.date}</p>
            </div>
            <div className={cls.info_right}>
              {hasRoles && (
                <>
                  {fields.roles.map((role) => (
                    <p key={role}>{role}</p>
                  ))}
                </>
              )}
              <p className={cls.client}>{fields.client}</p>
            </div>

            <CaseRich fields={fields} />
            <CaseFooter fields={fields} />
          </div>
        </article>

        {nextCase && (
          <PageFooter
            href={`/case/${nextCase.fields.slug}`}
            onEnter={() => dispatch(enableDarkmode())}
            onLeave={() => dispatch(disableDarkmode())}
            intersectionRatio={0.3}
          >
            <CaseNext nextCase={nextCase} />
          </PageFooter>
        )}
      </div>

      {nextCase && (
        <CaseTransition key={nextCase.fields.slug} nextCase={nextCase} />
      )}
    </>
  );
}

CaseDetail.displayName = 'CaseDetail';
