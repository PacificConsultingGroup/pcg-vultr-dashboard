
import { NextPage } from 'next';
import usePageTransition from '@/src/hooks/usePageTransition';

const PageOne: NextPage = () => {

  const { pageTransitionTo } = usePageTransition(500);

  return (
    <>
      <button type="button" onClick={ () => pageTransitionTo('/test/pageTwo') }>
        To PageTwo!
      </button>
    </>
  );
};

export default PageOne;