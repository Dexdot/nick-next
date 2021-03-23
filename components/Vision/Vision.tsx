import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import type { TopLevelBlock } from '@contentful/rich-text-types';
import { gsap } from 'gsap';
import cn from 'classnames';

import { isText, renderText } from '@/utils/utils';
import { disableDarkmode } from '@/store/darkmode';
import { useRefState } from '@/hooks/useRefState';

import cls from './Vision.module.sass';
// @ts-ignore
import visionCircle from './vision-circle.png';
// @ts-ignore
import visionCircle2 from './vision-circle-2.png';
// @ts-ignore
import visionCircleBlack from './vision-circle-black.png';
// @ts-ignore
// import moonW from './moon-w.svg';

interface PropsI {
  slides: TopLevelBlock[][];
}

type SliderDirection = 'prev' | 'next';

export function Vision({ slides }: PropsI): JSX.Element {
  const router = useRouter();

  // Darkmode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disableDarkmode());
  }, []);

  // Slider
  const [, setDir, dirRef] = useRefState<SliderDirection>('next');
  const [activeSlide, setActiveSlide, activeSlideRef] = useRefState<number>(0);

  const [isCircleAnimated, setCircleAnimated] = useState<boolean>(false);
  const [isBlur, setBlur] = useState<boolean>(false);
  const [isFaster, setFaster] = useState<boolean>(false);

  const quotesRef = useRef(null);
  const circleRef1 = useRef(null);
  const circleRef2 = useRef(null);

  const animateCircle = useCallback(
    (scale: number) => {
      if (window.innerWidth > 768) return false;

      const items = [circleRef1.current, circleRef2.current];
      gsap.set(items, { transition: 'unset' });

      gsap.to(items, {
        scale,
        duration: 0.8,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.set(items, { transition: '' });
        }
      });
    },
    [circleRef1, circleRef2]
  );

  const onTransitionEnd = useCallback(
    ({ propertyName }) => {
      if (propertyName !== 'opacity') return false;

      const slideIndex = activeSlideRef.current;
      const direction = dirRef.current;

      if (direction === 'prev' && slideIndex > 0) {
        setActiveSlide(slideIndex - 1);
      }

      if (direction === 'next' && slideIndex !== slides.length - 1) {
        setActiveSlide(slideIndex + 1);
      }

      if (quotesRef && quotesRef.current) {
        setBlur(true);
        quotesRef?.current?.removeEventListener(
          'transitionend',
          onTransitionEnd
        );
        animateCircle(1);
      }
    },
    [dirRef, activeSlideRef, slides, quotesRef]
  );

  const moveSlide = useCallback(
    (d: SliderDirection) => {
      setDir(d);
      setBlur(false);
      quotesRef?.current?.addEventListener('transitionend', onTransitionEnd);
      animateCircle(0.56);
    },
    [quotesRef]
  );

  const onCircleClick = useCallback(() => {
    if (window.innerWidth > 768) return false;

    const slideIndex = activeSlideRef.current;

    if (slideIndex !== slides.length - 1) {
      moveSlide('next');
    } else {
      router.push('/black');
    }
  }, [activeSlideRef, slides]);

  const enterAnimation = useCallback(() => {
    setTimeout(() => {
      setBlur(true);
    }, 200);

    setTimeout(() => {
      setFaster(true);
    }, 2200);

    setCircleAnimated(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          enterAnimation();
        }, 400);
      } else {
        window.addEventListener('load', enterAnimation);
      }
    }, 0);
  }, []);

  return (
    <section className={cls.container}>
      <article
        className={cn(cls.quotes, {
          [cls.quotes_blur]: isBlur,
          [cls.quotes_faster]: isFaster
        })}
        ref={quotesRef}
      >
        {slides[activeSlide].map((block, i) => (
          // eslint-disable-next-line
          <React.Fragment key={i}>
            {isText(block) && (
              <p
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{
                  __html: renderText(block)
                }}
              />
            )}
          </React.Fragment>
        ))}
      </article>

      <div className={cls.nav}>
        {activeSlide !== 0 && (
          <button type="button" onClick={() => moveSlide('prev')}>
            Назад
          </button>
        )}

        {activeSlide !== slides.length - 1 && (
          <button type="button" onClick={() => moveSlide('next')}>
            Далее
          </button>
        )}

        <Link href="/black">
          <a
            className={cn(cls.link, {
              [cls.link_hidden]: activeSlide !== slides.length - 1
            })}
            href="/black"
          >
            Black
          </a>
        </Link>
      </div>

      <button
        type="button"
        className={cn(cls.circle, {
          [cls.circle_animated]: isCircleAnimated,
          [cls.circle_faster]: isFaster,
          [cls.circle_last]: activeSlide === slides.length - 1
        })}
        data-index={activeSlide + 1}
        onClick={onCircleClick}
      >
        <img className={cls.circle_img} src={visionCircle} alt="Circle" />
        <img
          className={cls.circle_img}
          src={visionCircle2}
          alt="Circle"
          ref={circleRef1}
        />
        <img
          className={cn(cls.circle_img, cls.circle_img_black)}
          src={visionCircleBlack}
          alt="Circle"
          ref={circleRef2}
        />
        {/* <img className={cls.circle_moon} src={moonW} alt="Moon" /> */}
      </button>
    </section>
  );
}

Vision.displayName = 'Vision';
