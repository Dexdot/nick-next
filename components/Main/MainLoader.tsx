import React from 'react';
import cn from 'classnames';

import cls from './Main.module.sass';
// @ts-ignore
import icon from './logo.svg';

interface PropsI {
  show: boolean;
}

export function MainLoader({ show }: PropsI): JSX.Element {
  return (
    <div className={cn(cls.preloader, { [cls.preloader_visible]: show })}>
      <img src={icon} alt="Nick Adams" />
    </div>
  );
}
