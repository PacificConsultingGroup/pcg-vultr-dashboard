
import { NextPage } from 'next';
import usePageTransition from '@/src/hooks/usePageTransition';

const PageTwo: NextPage = () => {

  const { pageTransitionTo } = usePageTransition();

  return (
    <>
      <button type="button" onClick={ () => pageTransitionTo('/test/pageOne', { duration: 1000 }) }>
        To PageOne!
      </button>
    </>
  );
};

export default PageTwo;