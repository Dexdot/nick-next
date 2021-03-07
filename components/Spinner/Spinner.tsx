import React from 'react';
import cls from './Spinner.module.sass';

interface PropsI {
  size?: number;
  color?: string;
}

export function Spinner({ size, color }: PropsI): JSX.Element {
  return (
    <svg
      style={{ '--color': color } as React.CSSProperties}
      width={size}
      height={size}
      className={cls.spinner}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
}

Spinner.displayName = 'Spinner';

Spinner.defaultProps = {
  size: 40,
  color: '#fff'
};
