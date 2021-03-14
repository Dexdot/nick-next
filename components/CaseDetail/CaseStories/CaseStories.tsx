import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ICaseFields } from '@/contentful/types';

import { ContentfulImage } from '@/components/ContentfulImage';
import { isImage, isVideo } from '@/utils/utils';
import { useRefState } from '@/hooks/useRefState';

import cls from './CaseStories.module.sass';

interface PropsI {
  stories: ICaseFields['stories'];
  onClick: () => void;
}

export function CaseStories({ stories, onClick }: PropsI): JSX.Element {
  const interval = useRef(null);
  const [index, setIndex, indexRef] = useRefState<number>(0);
  const lastIndex = useMemo<number>(() => stories.length - 1, [stories]);

  const onInterval = useCallback(() => {
    if (indexRef.current === lastIndex) {
      setIndex(0);
    } else {
      setIndex(indexRef.current + 1);
    }
  }, [indexRef]);

  useEffect(() => {
    if (!indexRef)
      return () => {
        clearInterval(interval.current);
        setIndex(0);
      };

    interval.current = setInterval(onInterval, 300);

    return () => {
      clearInterval(interval.current);
      setIndex(0);
    };
  }, []);

  return (
    <div className={cls.stories}>
      <ul>
        {stories.map((asset, i) => (
          <li
            key={asset.sys.id}
            style={{ display: index === i ? 'flex' : 'none' }}
          >
            <button type="button" onClick={onClick}>
              {isImage(asset) && <ContentfulImage img={asset} />}

              {isVideo(asset) && (
                <video
                  src={asset.fields.file.url}
                  playsInline
                  autoPlay
                  muted
                  loop
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

CaseStories.displayName = 'CaseStories';
