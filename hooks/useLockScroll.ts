import { useEffect } from 'react';

export function useLockScroll(open: boolean): void {
  useEffect(() => {
    document
      .querySelector('body')
      .classList[open ? 'add' : 'remove']('no-scroll');
  }, [open]);
}
