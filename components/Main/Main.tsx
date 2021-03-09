import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { InView } from 'react-intersection-observer';
import cn from 'classnames';

import { Head } from '@/components/Head';
import { ICasesFields } from '@/contentful/types';
import { disableDarkmode, enableDarkmode } from '@/store/darkmode';

import cls from './Main.module.sass';
import { CasePreview } from './CasePreview';

const MAX_CASES_LEN = 16;

interface PropsI {
  cases: ICasesFields['list'];
  title: string;
  shouldEnableDarkmode?: boolean;
}

export function Main({
  title,
  cases,
  shouldEnableDarkmode
}: PropsI): JSX.Element {
  const { scroll, isReady } = useLocomotiveScroll();

  const [opacity, setOpacity] = useState<number>(1);
  const [titleText, setTitleText] = useState<string>(cases[0].fields.title);
  const rects = useRef({});

  const handleFooterVisible = useCallback(
    (isVisible: boolean, entry: IntersectionObserverEntry) => {
      const visible = isVisible && entry.intersectionRatio >= 0.3;
      setOpacity(visible ? 0 : 1);
    },
    []
  );

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
    [titleText, rects]
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
        setTitleText(v.title);
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

  // Darkmode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shouldEnableDarkmode ? enableDarkmode() : disableDarkmode());
  }, [shouldEnableDarkmode]);

  return (
    <>
      <Head title={`${title} | Nick Adams`} />

      <h2
        className={cn(cls.fixed_title, cls.fixed_title_desktop)}
        style={{
          opacity
        }}
      >
        {titleText}
      </h2>

      <div data-scroll-section>
        <div className={cls.container}>
          <h2
            className={cls.fixed_title}
            style={{
              opacity
            }}
          >
            {titleText}
          </h2>

          {cases.slice(0, MAX_CASES_LEN).map((c, i) => (
            <CasePreview
              key={c.sys.id}
              data={c}
              index={i}
              onIntersect={handleIntersect}
            />
          ))}
        </div>

        <InView
          as="div"
          onChange={handleFooterVisible}
          threshold={[0, 0.3, 0.6, 1]}
        >
          <div className={cls.footer} />
        </InView>
      </div>
    </>
  );
}

Main.displayName = 'Main';

Main.defaultProps = {
  shouldEnableDarkmode: false
};
