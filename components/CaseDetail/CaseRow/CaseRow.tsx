import React from 'react';
import { Asset } from 'contentful';

import { ContentfulImage } from '@/components/ContentfulImage';
import { isImage, isVideo } from '@/utils/utils';

import cls from './CaseRow.module.sass';

interface PropsI {
  images: Asset[];
}

export function CaseRow({ images }: PropsI): JSX.Element {
  return (
    <ul className={cls.list}>
      {images.map((asset) => (
        <li key={asset.sys.id}>
          {isImage(asset) && <ContentfulImage img={asset} />}

          {isVideo(asset) && (
            <video
              src={asset.fields.file.url}
              autoPlay
              playsInline
              loop
              muted
            />
          )}
        </li>
      ))}
    </ul>
  );
}

CaseRow.displayName = 'CaseRow';
