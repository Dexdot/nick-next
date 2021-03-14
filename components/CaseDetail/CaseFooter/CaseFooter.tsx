import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState } from '@/store/root-reducer';
import { isText, renderText } from '@/utils/utils';
import { ICaseFields } from '@/contentful/types';
import cls from './CaseFooter.module.sass';

interface PropsI {
  fields: ICaseFields;
}

export function CaseFooter({ fields }: PropsI): JSX.Element {
  const isDarkmode = useSelector((s: RootState) => s.darkmode);

  const hasTeamContent = useMemo(
    () => fields.team && fields.team.content.length > 0,
    [fields]
  );

  return (
    <>
      <ul className={cls.footer}>
        {(fields.clientLabel || fields.client) && (
          <li>
            {fields.clientLabel && <b>{fields.clientLabel}</b>}
            {fields.client && <p>{fields.client}</p>}
          </li>
        )}

        {hasTeamContent && (
          <li>
            <ul className={cls.footer_list}>
              {fields.team.content.map((item, i) => (
                // eslint-disable-next-line
                <li key={i}>
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

            {fields.contentAuthors && (
              <div className={cn(cls.footer_content, cls.footer_content_inner)}>
                <b>Content</b>

                <ul className={cls.footer_list}>
                  {fields.contentAuthors.map((item, i) => (
                    // eslint-disable-next-line
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        )}

        {fields.contentAuthors && (
          <li className={cls.footer_content}>
            <b>Content</b>

            <ul className={cls.footer_list}>
              {fields.contentAuthors.map((item, i) => (
                // eslint-disable-next-line
                <li key={i}>{item}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>

      {fields.etalon && (
        <div className={cls.etalon}>
          <p>Etalon</p>

          <a href={fields.etalon} target="_blank" rel="noreferrer">
            <b>{fields.etalon.replace(/(^\w+:|^)\/\//, '')}</b>
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
        </div>
      )}
    </>
  );
}

CaseFooter.displayName = 'CaseFooter';
