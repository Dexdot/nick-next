import React, { useEffect } from 'react';
import type { Asset } from 'contentful';
import { useDispatch } from 'react-redux';

import { enableDarkmode } from '@/store/darkmode';

import cls from './BlackList.module.sass';
import { BlackItem } from './BlackItem';

interface PropsI {
  list: Asset[];
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
          <li key={asset.sys.id}>
            <BlackItem asset={asset} />
          </li>
        ))}
      </ul>
    </div>
  );
}
