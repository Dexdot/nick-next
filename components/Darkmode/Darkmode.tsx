import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { RootState } from '@/store/root-reducer';
import cls from './Darkmode.module.sass';

interface PropsI {
  children: JSX.Element;
}

export function Darkmode({ children }: PropsI): JSX.Element {
  const isDarkmode = useSelector((s: RootState) => s.darkmode);

  return (
    <div className={cn(cls.container, { [cls.dark]: isDarkmode })}>
      {children}
    </div>
  );
}

Darkmode.displayName = 'Darkmode';
