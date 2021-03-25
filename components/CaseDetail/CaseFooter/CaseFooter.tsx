import React, { useMemo } from 'react';
import cn from 'classnames';

import { isText, renderText } from '@/utils/utils';
import { ICaseFields } from '@/contentful/types';
import cls from './CaseFooter.module.sass';

interface PropsI {
  fields: ICaseFields;
}

export function CaseFooter({ fields }: PropsI): JSX.Element {
  const hasTeamContent = useMemo(
    () => fields.team && fields.team.content.length > 0,
    [fields]
  );

  const etalonText = useMemo(() => {
    if (!fields.etalon) return '';

    const text = fields.etalon.replace(/(^\w+:|^)\/\//, '');
    return text.endsWith('/') ? text.slice(0, text.length - 1) : text;
  }, [fields.etalon]);

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
            <b>{etalonText}</b>
          </a>
        </div>
      )}
    </>
  );
}

CaseFooter.displayName = 'CaseFooter';
