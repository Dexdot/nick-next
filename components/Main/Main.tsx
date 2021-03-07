import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shouldEnableDarkmode ? enableDarkmode() : disableDarkmode());
  }, [shouldEnableDarkmode]);

  return (
    <>
      <Head title={`${title} | Nick Adams`} />

      <div data-scroll-section>
        <div className={cls.container}>
          {cases.slice(0, MAX_CASES_LEN).map((c, i) => (
            <CasePreview key={c.sys.id} data={c} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

Main.displayName = 'Main';

Main.defaultProps = {
  shouldEnableDarkmode: false
};
