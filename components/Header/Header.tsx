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

export function Header(): JSX.Element {
  const router = useRouter();
  const [isAboutPage, setIsAboutPage] = useState<boolean>(false);

  const dispatch = useDispatch();

  const isDarkmode = useSelector((s: RootState) => s.darkmode);
  const modal = useSelector((s: RootState) => s.modal);

  const ctx = useLocomotiveScroll();
  const isScrolling = useIsScrolling(ctx);

  const isHeaderDark = useMemo(() => {
    return modal.open ? OTHER_MODALS.includes(modal.name) : isDarkmode;
  }, []);

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
        [cls.hidden]: isScrolling,
        [cls.dark]: isHeaderDark
      })}
    >
      <div className="container">
        <div className={cls.inner}>
          <div className={cn(cls.logo, { [cls.hidden]: isAboutPage })}>
            <Link href="/">
              <>{isHeaderDark ? <LogoWhite /> : <LogoBlack />}</>
            </Link>
          </div>

          <MenuButton active={modal.open} onClick={onButtonClick} />
        </div>
      </div>
    </header>
  );
}

Header.displayName = 'Header';
