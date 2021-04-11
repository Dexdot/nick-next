import React, { useCallback, useMemo, useState } from 'react';
import type { Asset } from 'contentful';
import { InView } from 'react-intersection-observer';
import cn from 'classnames';

import { Spinner } from '@/components/Spinner/Spinner';
import { ContentfulImage } from '@/components/ContentfulImage';
import { isImage, isVideo } from '@/utils/utils';

import cls from './BlackList.module.sass';

interface PropsI {
  asset: Asset;
}

interface AssetSizeI {
  width: number;
  height: number;
}

export function BlackItem({ asset }: PropsI): JSX.Element {
  const initialSize = isImage(asset)
    ? asset.fields.file.details.image
    : { width: 1, height: 1 };

  const [size, setSize] = useState<AssetSizeI>(initialSize);

  const ratio = useMemo<number>(() => {
    const { width, height } = size;
    const aspect = height / width;
    return Number.parseFloat(aspect.toFixed(2)) * 100;
  }, [size]);

  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);

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
        className={cn(cls.asset, {
          [cls.asset_loaded]: isLoaded
        })}
        style={
          {
            '--ratio': `${ratio}%`
          } as React.CSSProperties
        }
      >
        {isVisible && (
          <>
            {!isLoaded && (
              <div className={cls.spinner}>
                <Spinner />
              </div>
            )}

            <div
              className={cn(cls.image_opacity, {
                [cls.image_opacity_active]: isLoaded
              })}
            >
              {isImage(asset) && (
                <ContentfulImage img={asset} onLoad={handleLoad} />
              )}

              {isVideo(asset) && (
                <video
                  src={asset.fields.file.url}
                  onPlay={handleLoad}
                  onLoad={handleLoad}
                  onLoadedMetadata={(e) =>
                    setSize({
                      width: e.currentTarget.videoWidth,
                      height: e.currentTarget.videoHeight
                    })
                  }
                  autoPlay
                  playsInline
                  loop
                  muted
                />
              )}
            </div>
          </>
        )}
      </div>
    </InView>
  );
}
