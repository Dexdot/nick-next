import React, { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { InView } from 'react-intersection-observer';
import { Entry, Asset } from 'contentful';
import cn from 'classnames';

import { ContentfulImage } from '@/components/ContentfulImage';
import { isImage, isVideo } from '@/utils/utils';
import { RootState } from '@/store/root-reducer';

import cls from './Main.module.sass';
import { CaseLink } from './CaseLink';

const threshold = [
  0,
  0.5,
  0.1,
  0.15,
  0.2,
  0.25,
  0.3,
  0.35,
  0.4,
  0.45,
  0.5,
  0.55,
  0.6,
  0.65,
  0.7,
  0.75,
  0.8,
  0.85,
  0.9,
  0.95,
  1
];

type CaseI = Entry<{
  [fieldId: string]: any;
}>;

interface PropsI {
  index: number;
  data: CaseI;
  onIntersect: (
    title: string,
    isVisible: boolean,
    entry: IntersectionObserverEntry
  ) => void;
  onMouseEnter: (c: CaseI) => void;
  onMouseLeave: () => void;
}

export function CasePreview({
  data,
  index,
  onIntersect,
  onMouseEnter,
  onMouseLeave
}: PropsI): JSX.Element {
  const isDarkmode = useSelector((s: RootState) => s.darkmode);
  const [isVisible, setVisible] = useState<boolean>(false);

  // Data
  const fields = useMemo(() => data.fields, [data]);
  const hasText = useMemo<boolean>(() => fields.title || fields.subtitle, [
    fields
  ]);
  const url = useMemo(() => `/case/${fields.slug}`, [fields.slug]);

  // Handlers
  const handleVisible = useCallback(
    (inView, entry: IntersectionObserverEntry) => {
      onIntersect(fields.title, inView, entry);
      if (!isVisible) setVisible(inView);
    },
    [isVisible, fields.title]
  );

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(data);
  }, [onMouseEnter]);

  return (
    <InView
      as="div"
      onChange={handleVisible}
      threshold={threshold}
      data-transition="main-list-item"
    >
      <div
        data-index={index + 1}
        className={cn(cls.case, {
          [cls.case_dark]: isDarkmode
        })}
      >
        {fields.covers.map((cover: Asset, i: number) => (
          <React.Fragment key={cover.sys.id}>
            <div
              className={cls.image_wrap}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className={cls.image}>
                <CaseLink soon={fields.soon} url={url}>
                  <span
                    className={cn(cls.preview_transition, {
                      [cls.preview_transition_active]: isVisible
                    })}
                  >
                    {isImage(cover) && <ContentfulImage img={cover} />}

                    {isVideo(cover) && (
                      <video
                        src={cover.fields.file.url}
                        autoPlay
                        playsInline
                        loop
                        muted
                      />
                    )}
                  </span>
                </CaseLink>
              </div>

              {i === 0 && hasText && (
                <CaseLink soon={fields.soon} url={url}>
                  <span className={cls.text}>
                    {fields.subtitle && (
                      <p className={cls.subtitle}>{fields.subtitle}</p>
                    )}
                  </span>
                </CaseLink>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </InView>
  );
}

CasePreview.displayName = 'CasePreview';
