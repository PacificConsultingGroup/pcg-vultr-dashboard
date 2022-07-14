import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

interface Options {
  redirectType?: 'back' | 'replace' | 'push';
  currentPageExitDuration?: number;
  nextPageEnterDuration?: number;
}

const defaultOptions: Options = {
  redirectType: 'push',
  currentPageExitDuration: 100, // In ms. 
  nextPageEnterDuration: 100 // In ms. 
};

export default function usePageTransition() {

  const router = useRouter();

  function afterPageEnter(e: TransitionEvent) {
    if (e.currentTarget !== e.target) return;
    const bodyNode = document.querySelector('body');
    bodyNode?.style.setProperty('pointer-events', 'unset');
    bodyNode?.removeEventListener('transitionend', afterPageEnter);
  }

  function pageTransitionTo(destinationURL: string, options: Options = {}) {
    const {
      currentPageExitDuration,
      nextPageEnterDuration,
      redirectType
    } = Object.assign({ ...defaultOptions }, options);
    function afterPageExit(e: TransitionEvent) {
      if (e.currentTarget !== e.target) return;
      const bodyNode = document.querySelector('body');
      bodyNode?.removeEventListener('transitionend', afterPageExit);
      bodyNode?.addEventListener('transitionend', afterPageEnter);
      bodyNode?.style.setProperty('--page-transition-duration', `${nextPageEnterDuration! <= 0 ? 1 : nextPageEnterDuration}ms`);
      switch (redirectType) {
        case 'back': return router.back();
        case 'replace': return router.replace(destinationURL);
        case 'push': return router.push(destinationURL);
      }
    }
    const bodyNode = document.querySelector('body');
    bodyNode?.style.setProperty('pointer-events', 'none');
    bodyNode?.style.setProperty('--page-transition-duration', `${currentPageExitDuration! <= 0 ? 1 : currentPageExitDuration}ms`);
    bodyNode?.addEventListener('transitionend', afterPageExit);
    bodyNode?.classList.add('pageFadeOut');
  }

  useEffect(() => {
    const bodyNode = document.querySelector('body');
    bodyNode?.classList.remove('pageFadeOut');
  }, []);

  return {
    pageTransitionTo
  };
}