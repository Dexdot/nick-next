import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { enableDarkmode } from '@/store/darkmode';
import { IBlackAsset } from '@/contentful/types';

import cls from './BlackList.module.sass';
import { BlackItem } from './BlackItem';

interface PropsI {
  list: IBlackAsset[];
}

export function BlackList({ list }: PropsI): JSX.Element {
  // Darkmode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableDarkmode());
  }, []);

  return (
    <div className="container">
      <ul className={cls.list}>
        {list.map((asset) => (
          <li
            key={asset.sys.id}
            style={
              { '--width': asset.fields.width || 2 } as React.CSSProperties
            }
          >
            <BlackItem asset={asset.fields.asset} />
          </li>
        ))}
      </ul>
    </div>
  );
}
