import React, { useCallback } from 'react';
import cn from 'classnames';
import cls from './Header.module.sass';

interface PropsI {
  active: boolean;
  onClick: () => void;
}

export function MenuButton({ active, onClick }: PropsI): JSX.Element {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      type="button"
      className={cn(cls.button, { [cls.button_active]: active })}
      onClick={handleClick}
    >
      <div className={cls.button_inner}>
        <span className={cls.button_circle} />
        <span className={cls.button_circle} />
        <span className={cls.button_circle} />
        <span className={cls.button_circle} />
      </div>
    </button>
  );
}

MenuButton.displayName = 'MenuButton';
