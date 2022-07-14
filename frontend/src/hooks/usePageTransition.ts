import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

interface Options {
  redirectType?: 'back' | 'replace' | 'push';
}

const defaultOptions: Options = {
  redirectType: 'push'
};

export default function usePageTransition(duration = 100) {

  /*
    PARAMTERS:
    * duration: The duration of the enter/exit transition. In ms.
  */

  const router = useRouter();
  const bodyNodeRef = useRef<HTMLBodyElement | null>(null);
  const afterPageExitCallbackRef = useRef<(e: TransitionEvent) => void>();

  function pageTransitionTo(destinationURL: string, options: Options = defaultOptions) {
    const { redirectType } = options;
    function afterPageExit(e?: TransitionEvent) {
      if (e?.currentTarget !== e?.target) return;
      switch (redirectType) {
        case 'back': return router.back();
        case 'replace': return router.replace(destinationURL);
        case 'push': return router.push(destinationURL);
      }
    }
    if (duration === 0) return afterPageExit();
    bodyNodeRef.current?.style.setProperty('--page-transition-duration', `${duration}ms`);
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