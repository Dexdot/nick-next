import React from 'react';
import cn from 'classnames';

import cls from './MainFooter.module.sass';
// @ts-ignore
import image from './image.jpg';

export function MainFooter(): JSX.Element {
  return (
    <section className={cls.container}>
      <div className={cls.inner}>
        <h2 className={cn('t-h1', cls.title)}>About</h2>
        <p>
          Digital designer & art director
          <br />
          from St. Petersburg
        </p>
        <img className={cls.image} src={image} alt="Nick Adams" />
      </div>
    </section>
  );
}
