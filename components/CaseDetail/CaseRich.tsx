import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import { Document } from '@contentful/rich-text-types';

import { ICaseFields } from '@/contentful/types';
import {
  getStyleRatio,
  isBlock,
  isImageBlock,
  isNotText,
  isQuote,
  isRow,
  isText,
  isVideoBlock,
  renderText
} from '@/utils/utils';
import { RootState } from '@/store/root-reducer';
import { ContentfulImage } from '@/components/ContentfulImage';

import { CaseBlock } from '@/components/CaseDetail/CaseBlock/CaseBlock';
import { CaseQuote } from '@/components/CaseDetail/CaseQuote/CaseQuote';
import { CaseRow } from '@/components/CaseDetail/CaseRow/CaseRow';

import cls from '@/components/CaseDetail/CaseDetail.module.sass';

interface PropsI {
  fields: ICaseFields;
}

export function CaseRich({ fields }: PropsI): JSX.Element {
  const isDarkmode = useSelector((s: RootState) => s.darkmode);

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

  const hasRoles = useMemo<boolean>(
    () => fields.roles && fields.roles.length > 1,
    [fields]
  );

  return (
    <ul className={cls.content}>
      {richContent.map((item, i) => (
        <li
          // eslint-disable-next-line
          key={i}
          className={cn({
            [cls.image_wrap]: isImageBlock(item) || isVideoBlock(item),
            [cls.text]: isText(item),
            [cls.block]: isNotText(item)
          })}
        >
          {/* @ts-ignore */}
          {item.isFirstBlock && fields.url && (
            <a
              className={cls.url}
              href={fields.url}
              target={fields.url.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
            >
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
            <div className={cls.image} style={getStyleRatio(item.data.target)}>
              <ContentfulImage img={item.data.target} />
            </div>
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

          {isBlock(item) && <CaseBlock data={item.data.target.fields} />}

          {isRow(item) && <CaseRow images={item.data.target.fields.images} />}

          {isQuote(item) && <CaseQuote data={item.data.target.fields} />}
        </li>
      ))}
    </ul>
  );
}

CaseRich.displayName = 'CaseRich';
