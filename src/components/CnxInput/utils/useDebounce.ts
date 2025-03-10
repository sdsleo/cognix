import { useRef } from 'react';

export function useDebounce(fn: any, delay: number) {
  const timeoutRef: any = useRef(null);

  function deboucedFn(...args: any) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return deboucedFn;
}
