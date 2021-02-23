import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState } from '@/store/root-reducer';

import cls from './Menu.module.sass';
import { Instagram } from './Icons';

export function Menu(): JSX.Element {
  const modal = useSelector((s: RootState) => s.modal);
  const isOpen = useMemo(() => modal.name === 'menu' && modal.open, [
    modal.name,
    modal.open
  ]);

  return (
    <section className={cn(cls.container, { [cls.hidden]: !isOpen })}>
      <div className={cls.overlay} />
      <nav className={cls.nav}>Nav</nav>

      <a
        className={cls.social}
        href="https://instagram.com/stereocage"
        target="_blank"
        rel="noreferrer"
      >
        <Instagram />
      </a>
    </section>
  );
}

Menu.displayName = 'Menu';
