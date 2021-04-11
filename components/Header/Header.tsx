import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';

import { useIsScrolling } from '@/hooks/useIsScrolling';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

import { RootState } from '@/store/root-reducer';
import { closeModal, openModal } from '@/store/modal';

import cls from './Header.module.sass';
import { LogoWhite, LogoBlack } from './Logo';
import { MenuButton } from './MenuButton';

const OTHER_MODALS = ['menu', 'credits'];
const ROUTES_TO_SHOW = ['/', '/black'];

export function Header(): JSX.Element {
  const router = useRouter();
  const [isAboutPage, setIsAboutPage] = useState<boolean>(false);

  const dispatch = useDispatch();

  const isDarkmode = useSelector((s: RootState) => s.darkmode);
  const modal = useSelector((s: RootState) => s.modal);
  const isRouteAnimating = useSelector((s: RootState) => s.routeAnimating);

  const ctx = useLocomotiveScroll();
  const isScrolling = useIsScrolling(ctx);

  const isHeaderDark = useMemo(() => {
    return modal.open ? OTHER_MODALS.includes(modal.name) : isDarkmode;
  }, [modal.open, modal.name, isDarkmode]);

  const showBWLink = useMemo(() => {
    if (modal.open) {
      return false;
    }

    return ROUTES_TO_SHOW.some((r) => r === router.route);
  }, [modal.open, router.route]);

  const onButtonClick = useCallback(() => {
    if (modal.open) {
      dispatch(closeModal());
    } else {
      dispatch(openModal('menu'));
    }
  }, [modal.open]);

  useEffect(() => {
    setIsAboutPage(router.route.slice(1) === 'about');
  }, [router.route]);

  return (
    <header
      className={cn(cls.header, {
        [cls.hidden]: isScrolling && !isRouteAnimating,
        [cls.dark]: isHeaderDark
      })}
    >
      <div className="container">
        <div className={cls.inner}>
          <div className={cn(cls.logo, { [cls.hidden]: isAboutPage })}>
            <Link href="/">
              <a href="/">{isHeaderDark ? <LogoWhite /> : <LogoBlack />}</a>
            </Link>
          </div>

          <Link href={isDarkmode ? '/' : '/black'}>
            <a
              className={cn(cls.bw_link, { [cls.bw_link_visible]: showBWLink })}
              href={isDarkmode ? '/' : '/black'}
              data-dark={isDarkmode}
            >
              {isDarkmode ? 'index' : 'black'}
            </a>
          </Link>

          <MenuButton active={modal.open} onClick={onButtonClick} />
        </div>
      </div>
    </header>
  );
}

Header.displayName = 'Header';
