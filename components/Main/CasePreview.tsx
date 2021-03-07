import React, { useMemo } from 'react';
import { Entry, Asset } from 'contentful';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ContentfulImage } from '@/components/ContentfulImage';
import { isImage, isVideo } from '@/utils/utils';
import { RootState } from '@/store/root-reducer';

import cls from './Main.module.sass';
import { CaseLink } from './CaseLink';

interface PropsI {
  index: number;
  data: Entry<{
    [fieldId: string]: any;
  }>;
}

export function CasePreview({ data, index }: PropsI): JSX.Element {
  const isDarkmode = useSelector((s: RootState) => s.darkmode);

  const fields = useMemo(() => data.fields, [data]);
  const hasText = useMemo<boolean>(() => fields.title || fields.subtitle, [
    fields
  ]);
  const url = useMemo(() => `/case/${fields.slug}`, [fields.slug]);

  return (
    <div
      className={cn(cls.case, {
        [cls.case_dark]: isDarkmode
      })}
      data-index={index + 1}
    >
      {fields.covers.map((cover: Asset, i: number) => (
        <React.Fragment key={cover.sys.id}>
          <div className={cls.image_wrap}>
            <div className={cls.image}>
              <CaseLink soon={fields.soon} url={url}>
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
              </CaseLink>
            </div>

            {i === 0 && hasText && (
              <CaseLink soon={fields.soon} url={url}>
                <span className={cls.text}>
                  {fields.title && <p className={cls.title}>{fields.title}</p>}
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
  );
}

CasePreview.displayName = 'CasePreview';
