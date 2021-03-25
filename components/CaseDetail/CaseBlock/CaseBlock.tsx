import React, { useMemo } from 'react';
import cn from 'classnames';

import { ContentfulImage } from '@/components/ContentfulImage';
import {
  getAssetRatio,
  isImage,
  isText,
  isVideo,
  renderText
} from '@/utils/utils';
import { ICaseBlockFields } from '@/contentful/types';

import cls from './CaseBlock.module.sass';

interface PropsI {
  data: ICaseBlockFields;
}

export function CaseBlock({ data }: PropsI): JSX.Element {
  const text1 = useMemo(() => data?.text1?.content, [data]);
  const hasText1 = useMemo<boolean>(() => data.text1 && text1.length > 0, [
    data,
    text1
  ]);

  const text2 = useMemo(() => data?.text2?.content, [data]);
  const hasText2 = useMemo<boolean>(() => data.text2 && text2.length > 0, [
    data,
    text2
  ]);

  return (
    <div className={cls.block}>
      {data.image && (
        <div
          className={cn(cls.image, { [cls.image_ratio]: isImage(data.image) })}
          style={
            {
              '--ratio': isImage(data.image)
                ? `${getAssetRatio(data.image)}%`
                : '',
              '--width': data.imageWidth || 3,
              '--offset': data.imageOffset || 0
            } as React.CSSProperties
          }
        >
          {isImage(data.image) && <ContentfulImage img={data.image} />}

          {isVideo(data.image) && (
            <video
              src={data.image.fields.file.url}
              autoPlay
              playsInline
              loop
              muted
            />
          )}
        </div>
      )}

      {hasText1 && (
        <div
          className={cn(cls.text, cls.text1)}
          style={
            {
              '--width': data.text1Width || 3,
              '--offset': data.text1Offset || 0
            } as React.CSSProperties
          }
        >
          {text1.map((item) => (
            <>
              {isText(item) && (
                <p
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{
                    __html: renderText(item)
                  }}
                />
              )}
            </>
          ))}
        </div>
      )}

      {hasText2 && (
        <div
          className={cn(cls.text, cls.text2)}
          style={
            {
              '--width': data.text2Width || 3,
              '--offset': data.text2Offset || 0
            } as React.CSSProperties
          }
        >
          {text2.map((item) => (
            <>
              {isText(item) && (
                <p
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{
                    __html: renderText(item)
                  }}
                />
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

CaseBlock.displayName = 'CaseBlock';
