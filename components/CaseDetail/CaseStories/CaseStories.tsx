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
  const images = useMemo<ICaseFields['stories']>(
    () => stories.filter((a) => isImage(a)),
    [stories]
  );
  const lastIndex = useMemo<number>(() => images.length - 1, [images]);

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
        {images.map((asset, i) => (
          <li
            key={asset.sys.id}
            style={{ display: index === i ? 'flex' : 'none' }}
          >
            <button type="button" onClick={onClick}>
              <ContentfulImage img={asset} width="200" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

CaseStories.displayName = 'CaseStories';
