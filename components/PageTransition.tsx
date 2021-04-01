import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useDispatch, useSelector } from 'react-redux';

import { setRouteAnimating } from '@/store/route-animating';
import type { RootState } from '@/store/root-reducer';
import { closeModal } from '@/store/modal';
import { pause } from '@/utils/utils';
import { useTransitionFix } from '@/hooks/useTransitionFix';
import { transitionsMap } from '@/transitions/map';

interface PropsI {
  pathname: string;
  children: React.ReactElement;
}

export function PageTransition({ children, pathname }: PropsI): JSX.Element {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const modal = useSelector((s: RootState) => s.modal);

  const { scroll: locoScroll } = useLocomotiveScroll();

  const [initial, setInitial] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<React.ReactElement>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);

  const onChange = useCallback(
    async (newChildren: React.ReactElement, newPath: string) => {
      // Fix native scroll reset issue
      const isMobile =
        locoScroll?.scroll.isMobile || locoScroll?.scroll.isTablet;
      const startY = locoScroll?.scroll.instance.scroll.y;

      if (
        isMobile &&
        startY > 0 &&
        startY !== document.scrollingElement.scrollTop
      ) {
        window.scrollTo(0, startY);
      }

      // Animating flag
      dispatch(setRouteAnimating(true));

      // Initial flag
      const isInitial = initial;
      if (isInitial) setInitial(false);

      // Close modal
      const isModalOpen = modal.open;
      const modalDelay = isModalOpen ? 400 : 0;

      if (isModalOpen) {
        dispatch(closeModal());
      }

      await pause(modalDelay);

      const isFromCaseToCase =
        currentPath === '/case/[slug]' && newPath === '/case/[slug]';
      const fromPath = isFromCaseToCase ? 'from/to_case' : currentPath;
      const toPath = isFromCaseToCase ? 'from/to_case' : newPath;

      // Leave
      if (!isInitial)
        await transitionsMap[fromPath].leave(containerRef.current);

      // Reset scroll
      if (locoScroll) {
        locoScroll.setScroll(0, 0);
        window.scrollTo(0, 0);
        locoScroll.update();
      }

      // Enter
      setCurrentPage(newChildren);
      setTimeout(async () => {
        if (!isInitial)
          await transitionsMap[toPath].enter(containerRef.current);
        setCurrentPath(newPath);
        dispatch(setRouteAnimating(false));
      }, 0);
    },
    [containerRef, currentPath, initial, locoScroll, modal.open]
  );

  useEffect(() => {
    onChange(children, pathname);
  }, [children, pathname]);

  useTransitionFix();

  return <div ref={containerRef}>{currentPage}</div>;
}
