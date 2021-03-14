import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Document } from '@contentful/rich-text-types';

import { ICase, ICaseFields } from '@/contentful/types';
import { RootState } from '@/store/root-reducer';
import { disableDarkmode } from '@/store/darkmode';
import { openModal } from '@/store/modal';
import { setStories } from '@/store/stories';
import {
  isBlock,
  isImage,
  isImageBlock,
  isNotText,
  isText,
  isVideo,
  isVideoBlock,
  renderText
} from '@/utils/utils';

import { ContentfulImage } from '@/components/ContentfulImage';
import { CaseStories } from '@/components/CaseDetail/CaseStories/CaseStories';
import cls from '@/components/CaseDetail/CaseDetail.module.sass';

interface PropsI {
  data: ICase;
}

export function CaseDetail({ data }: PropsI): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(disableDarkmode());
  }, []);

  const isDarkmode = useSelector((s: RootState) => s.darkmode);
  const fields = useMemo<ICaseFields>(() => data.fields, [data]);

  const hasRoles = useMemo<boolean>(
    () => fields.roles && fields.roles.length > 1,
    [fields]
  );

  const hasStories = useMemo<boolean>(
    () => fields.stories && fields.stories.length > 1,
    [fields]
  );

  const onStoriesClick = useCallback(() => {
    const { stories, title, date, etalon } = fields;
    const payload = {
      title,
      list: stories,
      subtitle: date,
      url: etalon
    };

    dispatch(setStories(payload));
    dispatch(openModal('stories'));
  }, [fields]);

  const richContent = useMemo<Document['content']>(() => {
    const rich = fields.content.content.filter((block) => {
      const isParagraph = isText(block);

      const hasInlineEntry = block.content.some(
        (b) => b.nodeType === 'embedded-entry-inline'
      );

      const isEmpty =
        isParagraph &&
        // @ts-ignore
        block.content.every((v) => v.value === '');

      return !isEmpty && !hasInlineEntry;
    });

    const firstBlock = rich.find((block) => isNotText(block));
    // @ts-ignore
    if (firstBlock) firstBlock.isFirstBlock = true;

    return rich;
  }, [fields]);

  console.log(richContent);

  return (
    <div>
      <article className={cls.wrapper}>
        <h1
          className={cn('t-h1', cls.title, {
            [cls.title_right]: fields.makeTitleRight
          })}
        >
          {fields.title}
        </h1>

        <div className={cn(cls.image, cls.cover)}>
          <ContentfulImage img={fields.cover} />

          {hasStories && (
            <CaseStories stories={fields.stories} onClick={onStoriesClick} />
          )}
        </div>

        <h2 className={cn('t-h2', cls.subtitle)}>{fields.subtitle}</h2>

        <div className={cls.container}>
          <div className={cls.info_left}>
            <p>{fields.date}</p>
          </div>

          <div className={cls.info_right}>
            {hasRoles && (
              <>
                {fields.roles.map((role) => (
                  <p key={role}>{role}</p>
                ))}
              </>
            )}
            <p className={cls.client}>{fields.client}</p>
          </div>

          <ul className={cls.content}>
            {richContent.map((item, i) => (
              <li
                // eslint-disable-next-line
                key={i}
                className={cn({
                  [cls.image_wrap]: isImageBlock(item) || isVideoBlock(item),
                  [cls.text]: isText(item),
                  [cls.block]: isBlock(item)
                })}
              >
                {/* @ts-ignore */}
                {item.isFirstBlock && fields.url && (
                  <a className={cls.url} href={fields.url}>
                    <span>{fields.urlText || fields.url}</span>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.16797 19.8332L19.8346 8.1665"
                        stroke={isDarkmode ? 'white' : 'black'}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.16797 8.1665H19.8346V19.8332"
                        stroke={isDarkmode ? 'white' : 'black'}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}

                {/* @ts-ignore */}
                {item.isFirstBlock && (
                  <div className={cn(cls.info_right, cls.info_right_inner)}>
                    {hasRoles && (
                      <>
                        {fields.roles.map((role) => (
                          <p key={role}>{role}</p>
                        ))}
                      </>
                    )}
                    <p className={cls.client}>{fields.client}</p>
                  </div>
                )}

                {isImageBlock(item) && (
                  <ContentfulImage
                    className={cls.image}
                    img={item.data.target}
                  />
                )}

                {isVideoBlock(item) && (
                  <video
                    className={cls.image}
                    src={item.data.target.fields.file.url}
                    autoPlay
                    playsInline
                    loop
                    muted
                  />
                )}

                {isText(item) && (
                  <p
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{
                      __html: renderText(item)
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

CaseDetail.displayName = 'CaseDetail';
