
import { NextPage } from 'next';
import usePageTransition from '@/src/hooks/usePageTransition';

const PageOne: NextPage = () => {

  const { pageTransitionTo } = usePageTransition();

  return (
    <>
      <button type="button" onClick={ () => pageTransitionTo('/test/pageTwo', { duration: 0 }) }>
        To PageTwo!
      </button>
    </>
  );
};

export default PageOne;