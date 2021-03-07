import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Head } from '@/components/Head';
import { ICasesFields } from '@/contentful/types';
import { disableDarkmode, enableDarkmode } from '@/store/darkmode';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shouldEnableDarkmode ? enableDarkmode() : disableDarkmode());
  }, [shouldEnableDarkmode]);

  return (
    <>
      <Head title={title} />

      <div data-scroll-section>
        <h1>{title}</h1>

        {cases.map((c) => (
          <p key={c.sys.id}>{c.fields.title}</p>
        ))}
      </div>
    </>
  );
}

Main.displayName = 'Main';

Main.defaultProps = {
  shouldEnableDarkmode: false
};
