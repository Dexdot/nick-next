import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { NavLink } from '@/components/NavLink';
import { RootState } from '@/store/root-reducer';
import { useLockScroll } from '@/hooks/useLockScroll';

import cls from './Menu.module.sass';
import { Instagram } from './Icons';

const links = [
  { text: 'Index', to: '/' },
  { text: 'About', to: '/about' },
  { text: 'Vision', to: '/vision' },
  { text: 'Journal', to: '/inspire', disabled: true }
];

export function Menu(): JSX.Element {
  const ref = useRef(null);

  const modal = useSelector((s: RootState) => s.modal);
  const isOpen = useMemo(() => modal.name === 'menu' && modal.open, [
    modal.name,
    modal.open
  ]);

  useLockScroll(isOpen);

  return (
    <CSSTransition
      classNames={{ ...cls }}
      timeout={1000}
      in={isOpen}
      nodeRef={ref}
      unmountOnExit
    >
      <section className={cls.container} key="menu" ref={ref}>
        <div className={cls.overlay} />
        <nav className={cls.nav}>
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                {l.disabled ? (
                  <span className={cls.link}>{l.text}</span>
                ) : (
                  <NavLink href={l.to}>
                    <a href={l.to}>
                      <span className={cls.link}>{l.text}</span>
                    </a>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <a
          className={cls.social}
          href="https://instagram.com/stereocage"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram />
        </a>
      </section>
    </CSSTransition>
  );
}

Menu.displayName = 'Menu';
