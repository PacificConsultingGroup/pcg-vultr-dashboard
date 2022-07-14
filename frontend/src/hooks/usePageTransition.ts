import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

interface Options {
  redirectType?: 'back' | 'replace' | 'push';
}

const defaultOptions: Options = {
  redirectType: 'push'
};

export default function usePageTransition() {

  const router = useRouter();
  const bodyNodeRef = useRef<HTMLBodyElement | null>(null);
  const afterPageExitCallbackRef = useRef<(e: TransitionEvent) => void>();

  function pageTransitionTo(destinationURL: string, options: Options = defaultOptions) {
    function afterPageExit(e: TransitionEvent) {
      if (e.currentTarget !== e.target) return;
      switch (options.redirectType) {
        case 'back':
          router.back();
          break;
        case 'replace':
          router.replace(destinationURL);
          break;
        case 'push':
          router.push(destinationURL);
          break;
      }
    }
    afterPageExitCallbackRef.current = afterPageExit;
    bodyNodeRef.current?.addEventListener('transitionend', afterPageExitCallbackRef.current);
    bodyNodeRef.current?.classList.add('pageFadeOut');
  }

  useEffect(() => {
    bodyNodeRef.current = document.querySelector('body');
    bodyNodeRef.current?.classList.remove('pageFadeOut');
    afterPageExitCallbackRef.current && bodyNodeRef.current?.removeEventListener('transitionend', afterPageExitCallbackRef.current);
  }, []);

  return {
    pageTransitionTo
  };
}