import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import type { TopLevelBlock } from '@contentful/rich-text-types';

import { enableDarkmode } from '@/store/darkmode';
import type { IAboutFields } from '@/contentful/types';
import { isText, renderText } from '@/utils/utils';

import cls from './About.module.sass';

interface PropsI {
  data: IAboutFields;
  mobileText: TopLevelBlock[];
}

const CURRENT_YEAR = new Date().getFullYear();

export function About({ data, mobileText }: PropsI): JSX.Element {
  // Darkmode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableDarkmode());
  }, []);

  // Text animation
  const [isTextAnimated, setTextAnimated] = useState<boolean>(false);

  const desktopTextRef = useRef(null);
  const splitDesktopText = useCallback(() => {
    // @ts-ignore
    const Split = window.SplitText;

    const p1 = desktopTextRef.current.querySelectorAll('p');
    let split = new Split(p1, { type: 'lines' });

    const p2 = desktopTextRef.current.querySelectorAll('p');
    split = new Split(p2, {
      type: 'lines',
      linesClass: 'about-text-line'
    });

    split.lines.forEach((line, i) => {
      line.style.setProperty('--delay', `${i * 0.05}s`);

      if (i === split.lines.length - 1) {
        line.addEventListener('transitionend', ({ propertyName }) => {
          if (propertyName === 'transform') {
            setTextAnimated(true);
          }
        });
      }
    });
  }, [desktopTextRef]);

  const mobTextRef = useRef(null);
  const splitMobText = useCallback(() => {
    // @ts-ignore
    const Split = window.SplitText;

    const p1 = mobTextRef.current.querySelectorAll('p');
    let split = new Split(p1, { type: 'lines' });

    const p2 = mobTextRef.current.querySelectorAll('p');
    split = new Split(p2, {
      type: 'lines',
      linesClass: 'about-text-line'
    });

    split.lines.forEach((line, i) => {
      line.style.setProperty('--delay', `${i * 0.05}s`);

      if (i === split.lines.length - 1) {
        line.addEventListener('transitionend', ({ propertyName }) => {
          if (propertyName === 'transform') {
            setTextAnimated(true);
          }
        });
      }
    });
  }, [mobTextRef]);

  const splitText = useCallback(async () => {
    await import('./split-text');
    splitDesktopText();
    splitMobText();
  }, []);

  useEffect(() => {
    splitText();
  }, []);

  console.log(data, mobileText);

  return (
    <section>
      <div className={cls.container}>
        <article className={cls.text_wrap}>
          <p className={cls.date}>2016-{CURRENT_YEAR}</p>

          <div
            ref={desktopTextRef}
            className={cn(cls.text, cls.text_desktop, {
              [cls.text_animated]: isTextAnimated
            })}
          >
            {data.text.content.map((item, i) => (
              // eslint-disable-next-line
              <React.Fragment key={i}>
                {isText(item) && (
                  <p
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{
                      __html: renderText(item)
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div
            ref={mobTextRef}
            className={cn(cls.text, cls.text_mob, {
              [cls.text_animated]: isTextAnimated
            })}
          >
            {mobileText.map((item, i) => (
              // eslint-disable-next-line
              <React.Fragment key={i}>
                {isText(item) && (
                  <p
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{
                      __html: renderText(item)
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
