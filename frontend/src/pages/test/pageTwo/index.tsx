
import { NextPage } from 'next';
import usePageTransition from '@/src/hooks/usePageTransition';

const PageTwo: NextPage = () => {

  const { pageTransitionTo } = usePageTransition(100);

  return (
    <>
      <button type="button" onClick={ () => pageTransitionTo('/test/pageOne') }>
        To PageOne!
      </button>
    </>
  );
};

export default PageTwo;