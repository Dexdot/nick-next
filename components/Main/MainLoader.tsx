import React from 'react';
import cls from './Main.module.sass';
// @ts-ignore
import icon from './logo.svg';

export function MainLoader(): JSX.Element {
  return (
    <div className={cls.preloader}>
      <img src={icon} alt="Nick Adams" />
    </div>
  );
}
