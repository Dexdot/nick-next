import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import cn from 'classnames';

import { RootState } from '@/store/root-reducer';
import { closeModal } from '@/store/modal';
import { isImage, isVideo } from '@/utils/utils';
import { ContentfulImage } from '@/components/ContentfulImage';

import cls from './Stories.module.sass';

export function Stories(): JSX.Element {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const data = useSelector((s: RootState) => s.stories);
  const modal = useSelector((s: RootState) => s.modal);
  const isOpen = useMemo(() => modal.name === 'stories' && modal.open, [
    modal.name,
    modal.open
  ]);
  const close = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const cleanUrl = useMemo<string>(
    () => data.url.replace(/(^\w+:|^)\/\//, ''),
    [data.url]
  );

  const [swiper, setSwiper] = useState(null);
  const onSlideClick = useCallback(
    (i: number) => {
      const isLast = i === data.list.length && i === swiper.activeIndex;

      if (!data.url || !isLast) {
        swiper.slideTo(i);
      } else if (isLast) {
        window.open(data.url);
      }
    },
    [swiper, data]
  );

  useEffect(() => {
    return () => swiper?.destroy(true, false);
  }, [swiper]);

  return (
    <CSSTransition
      classNames={{ ...cls }}
      timeout={300}
      in={isOpen}
      nodeRef={ref}
      unmountOnExit
    >
      <section className={cls.container} key="stories" ref={ref}>
        <header className={cls.head}>
          <p>{data.title}</p>

          <button className={cls.close} onClick={close} type="button">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 8L8 24" />
              <path d="M8 8L24 24" />
            </svg>
          </button>
        </header>

        <Swiper
          className={cls.swiper}
          slidesPerView="auto"
          initialSlide={0}
          speed={400}
          onSwiper={(s) => setSwiper(s)}
          autoHeight
          centeredSlides
          grabCursor
        >
          {data.list.map((asset, i) => (
            <SwiperSlide key={asset.sys.id}>
              <button
                className={cls.slide}
                type="button"
                onClick={() => onSlideClick(i)}
              >
                {isImage(asset) && <ContentfulImage img={asset} />}

                {isVideo(asset) && (
                  <video
                    src={asset.fields.file.url}
                    playsInline
                    autoPlay
                    muted
                    loop
                  />
                )}
              </button>
            </SwiperSlide>
          ))}

          {data.url && (
            <SwiperSlide>
              <div className={cn(cls.slide, cls.slide_url)}>
                <button
                  className={cn({
                    [cls.long_text]: cleanUrl.length > 35
                  })}
                  type="button"
                  onClick={() => onSlideClick(data.list.length)}
                >
                  <span>{cleanUrl}</span>
                </button>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </section>
    </CSSTransition>
  );
}

Stories.displayName = 'Stories';
