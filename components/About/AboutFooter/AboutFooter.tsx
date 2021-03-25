import React from 'react';
import cn from 'classnames';

import cls from './AboutFooter.module.sass';

export function AboutFooter(): JSX.Element {
  return (
    <section className={cls.container}>
      <div className={cls.inner}>
        <h2 className={cn('t-h1', cls.title)}>Vision</h2>
        <p>
          Looking the world through
          <br />
          eyes of another
        </p>
      </div>
    </section>
  );
}
