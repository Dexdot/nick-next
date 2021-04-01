import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { RootState } from '@/store/root-reducer';
import { closeModal } from '@/store/modal';
import { useLockScroll } from '@/hooks/useLockScroll';

import cls from './Credits.module.sass';

export function Credits(): JSX.Element {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const modal = useSelector((s: RootState) => s.modal);
  const isOpen = useMemo(() => modal.name === 'credits' && modal.open, [
    modal.name,
    modal.open
  ]);

  useLockScroll(isOpen);

  const close = useCallback(() => {
    dispatch(closeModal());
  }, []);

  return (
    <CSSTransition
      classNames={{ ...cls }}
      timeout={1000}
      in={isOpen}
      nodeRef={ref}
      unmountOnExit
    >
      <section className={cls.container} key="credits" ref={ref}>
        <div className={cls.overlay} />
        <nav className={cls.nav}>
          <ul>
            <li>
              <button onClick={close} type="button">
                <span>Design</span>
                <p>Nick Adams</p>
              </button>
            </li>
            <li>
              <a href="http://hvxzcb.com" target="_blank" rel="noreferrer">
                <span>Development</span>
                <p>Kamil Sometimes</p>
              </a>
            </li>
            <li>
              <a href="https://darina.now.sh" target="_blank" rel="noreferrer">
                <span>Management</span>
                <p>Darina Yurina</p>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </CSSTransition>
  );
}

Credits.displayName = 'Credits';
