import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import type { TopLevelBlock } from '@contentful/rich-text-types';

import type { IAboutFields } from '@/contentful/types';
import { isImage, isText, isVideo, renderText } from '@/utils/utils';
import { enableDarkmode } from '@/store/darkmode';
import { openModal } from '@/store/modal';
import { ContentfulImage } from '@/components/ContentfulImage';
import { PageFooter } from '@/components/PageFooter';

import cls from './About.module.sass';
import { AboutFooter } from './AboutFooter/AboutFooter';

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
    if (document.readyState === 'complete') {
      splitText();
    } else {
      window.addEventListener('load', splitText);
    }
  }, []);

  // Credits button
  const openCredits = useCallback(() => {
    dispatch(openModal('credits'));
  }, []);

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

        <ul className={cls.images}>
          {data.mediaList.slice(0, 2).map((asset, i) => (
            <li key={asset.sys.id}>
              <figure
                className={cls.image}
                style={
                  { '--delay': `${(i + 1) * 0.1}s` } as React.CSSProperties
                }
              >
                {isImage(asset) && <ContentfulImage img={asset} />}

                {isVideo(asset) && (
                  <video
                    src={asset.fields.file.url}
                    autoPlay
                    playsInline
                    loop
                    muted
                  />
                )}
              </figure>
            </li>
          ))}
        </ul>

        <div className={cls.info}>
          {data.mediaBig && (
            <figure className={cls.info_img}>
              {isImage(data.mediaBig) && (
                <ContentfulImage img={data.mediaBig} />
              )}

              {isVideo(data.mediaBig) && (
                <video
                  src={data.mediaBig.fields.file.url}
                  autoPlay
                  playsInline
                  loop
                  muted
                />
              )}
            </figure>
          )}

          <div className={cls.contact}>
            <ul>
              <li style={{ '--delay': `0.05s` } as React.CSSProperties}>
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </li>
              <li style={{ '--delay': `0.01s` } as React.CSSProperties}>
                {data.postAddress}
              </li>
              <li style={{ '--delay': `0.15s` } as React.CSSProperties}>
                Saint Petersburg
              </li>
              <li style={{ '--delay': `0.2s` } as React.CSSProperties}>
                Russia
              </li>
            </ul>

            <ul className={cls.social}>
              <li style={{ '--delay': `0.25s` } as React.CSSProperties}>
                <a
                  href="https://behance.net/stereocage"
                  target="_blank"
                  rel="noreferrer"
                >
                  behance
                </a>
              </li>
              <li style={{ '--delay': `0.3s` } as React.CSSProperties}>
                <a
                  href="https://dribbble.com/stereocage"
                  target="_blank"
                  rel="noreferrer"
                >
                  dribbble
                </a>
              </li>
              <li style={{ '--delay': `0.35s` } as React.CSSProperties}>
                <a
                  href="https://instagram.com/stereocage"
                  target="_blank"
                  rel="noreferrer"
                >
                  instagram
                </a>
              </li>
              <li style={{ '--delay': `0.4s` } as React.CSSProperties}>
                <a
                  href="https://facebook.com/stereocage"
                  target="_blank"
                  rel="noreferrer"
                >
                  facebook
                </a>
              </li>
            </ul>
          </div>

          <button className={cls.credits} type="button" onClick={openCredits}>
            Credits
          </button>
        </div>
      </div>

      <PageFooter href="/vision">
        <AboutFooter />
      </PageFooter>
    </section>
  );
}

About.displayName = 'About';
