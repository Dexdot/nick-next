import React, { useMemo } from 'react';

import cls from '@/components/CaseDetail/CaseDetail.module.sass';

import { ICase } from '@/contentful/types';

interface PropsI {
  data: ICase;
}

export function CaseDetail({ data }: PropsI): JSX.Element {
  const fields = useMemo(() => data.fields, [data]);

  return <div>{fields.title}</div>;
}
