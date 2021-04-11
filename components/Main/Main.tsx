import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import cn from 'classnames';

import type { ICasesFields } from '@/contentful/types';
import type { RootState } from '@/store/root-reducer';
import { disableDarkmode, enableDarkmode } from '@/store/darkmode';
import { setPageLoaded } from '@/store/page-loaded';

import { PageFooter } from '@/components/PageFooter';
import { MainLoader } from '@/components/Main/MainLoader';

import cls from './Main.module.sass';
import { CasePreview } from './CasePreview';
import { MainFooter } from './MainFooter/MainFooter';

const MAX_CASES_LEN = 16;

interface PropsI {
  cases: ICasesFields['list'];
}

export function Main({ cases }: PropsI): JSX.Element {
  const router = useRouter();

  // Darkmode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disableDarkmode());
  }, []);

  // Scroll
  const { scroll, isReady } = useLocomotiveScroll();
  const rects = useRef({});

  // Hover desktop
  const [caseTitleDesktop, setCaseTitleDesktop] = useState<string>(
    cases[0].fields.title
  );
  const [hoverOpacity, setHoverOpacity] = useState<number>(0);
  const onMouseEnter = useCallback((c) => {
    setCaseTitleDesktop(c.fields.title);
    setHoverOpacity(1);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHoverOpacity(0);
  }, []);

  // Title
  const [titleOpacity, setTitleOpacity] = useState<number>(1);
  const [caseTitle, setCaseTitle] = useState<string>(cases[0].fields.title);

  const onFooterEnter = useCallback(() => {
    setTitleOpacity(0);
    dispatch(enableDarkmode());
  }, []);

  const onFooterLeave = useCallback(() => {
    setTitleOpacity(1);
    dispatch(disableDarkmode());
  }, []);

  const handleIntersect = useCallback(
    (t: string, isVisible: boolean, entry: IntersectionObserverEntry) => {
      if (!rects || !rects.current || !isVisible) return;

      const temp = { ...rects.current };

      const nodeRect = entry.target as HTMLElement;
      const top = nodeRect.offsetTop;
      const bottom = top + nodeRect.offsetHeight;
      const rect = { top, bottom };

      temp[t] = { isVisible, rect, title: t };
      rects.current = { ...temp };
    },
    [caseTitle, rects]
  );

  const onScroll = useCallback(() => {
    const { y } = scroll.scroll.instance.scroll;

    const centerY = y + window.innerHeight / 2;
    let keys = Object.keys(rects.current);
    keys = keys.filter((k) => rects.current[k].isVisible);

    keys.forEach((k) => {
      const v = rects.current[k];
      const { top, bottom } = v.rect;
      const isIntersecting = centerY >= top && centerY <= bottom;

      if (isIntersecting) {
        setCaseTitle(v.title);
      }
    });
  }, [scroll, rects]);

  useEffect(() => {
    if (!isReady) return null;

    onScroll();
    scroll.on('scroll', onScroll);
    return () => {
      scroll.off('scroll', onScroll);
    };
  }, [isReady]);

  // Preloader
  const isPageLoaded = useSelector((s: RootState) => s.pageLoaded);
  const showPreloader = useMemo(() => {
    return router.route === '/' && !isPageLoaded;
  }, [isPageLoaded, router.route]);

  useEffect(() => {
    if (document.readyState === 'complete') {
      dispatch(setPageLoaded(true));
    } else {
      window.addEventListener('load', () => {
        dispatch(setPageLoaded(true));
      });
    }
  }, []);

  return (
    <div>
      <h2
        data-transition="main-element"
        className={cn(cls.fixed_title, cls.fixed_title_desktop)}
        style={{
          opacity: titleOpacity
        }}
      >
        <span
          style={{
            opacity: hoverOpacity
          }}
        >
          {caseTitleDesktop}
        </span>
      </h2>

      <section data-scroll-section data-transition="main-element">
        <div className={cls.container}>
          <h2
            className={cls.fixed_title}
            style={{
              opacity: titleOpacity
            }}
          >
            {caseTitle}
          </h2>

          {cases.slice(0, MAX_CASES_LEN).map((c, i) => (
            <CasePreview
              key={c.sys.id}
              data={c}
              index={i}
              onIntersect={handleIntersect}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          ))}
        </div>

        <PageFooter
          href="/about"
          onEnter={onFooterEnter}
          onLeave={onFooterLeave}
        >
          <MainFooter />
        </PageFooter>
      </section>

      <div className={cls.cover} data-transition="main-cover" />
      <MainLoader show={showPreloader} />
    </div>
  );
}

Main.displayName = 'Main';
