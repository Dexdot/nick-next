import React, { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { InView } from 'react-intersection-observer';
import { Entry, Asset } from 'contentful';
import cn from 'classnames';

import { ContentfulImage } from '@/components/ContentfulImage';
import { isImage, isVideo } from '@/utils/utils';
import { RootState } from '@/store/root-reducer';
import { Spinner } from '@/components/Spinner/Spinner';

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
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const fields = useMemo(() => data.fields, [data]);
  const hasText = useMemo<boolean>(() => fields.title || fields.subtitle, [
    fields
  ]);
  const url = useMemo(() => `/case/${fields.slug}`, [fields.slug]);

  const handleVisible = useCallback(
    (inView) => {
      if (!isVisible) setVisible(inView);
    },
    [isVisible]
  );

  const handleLoad = useCallback(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <InView as="div" onChange={handleVisible}>
      <div
        data-index={index + 1}
        className={cn(cls.case, {
          [cls.case_dark]: isDarkmode
        })}
      >
        {fields.covers.map((cover: Asset, i: number) => (
          <React.Fragment key={cover.sys.id}>
            <div className={cls.image_wrap}>
              <div className={cls.image}>
                {isVisible && (
                  <CaseLink soon={fields.soon} url={url}>
                    {!isLoaded && (
                      <div className={cls.spinner}>
                        <Spinner />
                      </div>
                    )}

                    <span
                      className={cn(cls.image_opacity, {
                        [cls.image_opacity_active]: isLoaded
                      })}
                    >
                      {isImage(cover) && (
                        <ContentfulImage
                          img={cover}
                          onLoad={() => i === 0 && handleLoad()}
                        />
                      )}

                      {isVideo(cover) && (
                        <video
                          src={cover.fields.file.url}
                          onPlay={() => i === 0 && handleLoad()}
                          onLoad={() => i === 0 && handleLoad()}
                          autoPlay
                          playsInline
                          loop
                          muted
                        />
                      )}
                    </span>
                  </CaseLink>
                )}
              </div>

              {i === 0 && hasText && (
                <CaseLink soon={fields.soon} url={url}>
                  <span className={cls.text}>
                    {fields.title && (
                      <p className={cls.title}>{fields.title}</p>
                    )}
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
