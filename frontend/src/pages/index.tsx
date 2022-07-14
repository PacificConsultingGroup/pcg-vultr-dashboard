import type { NextPage } from 'next';
import { useEffect } from 'react';
import useLoggedInUser from '@/src/hooks/useLoggedInUser';
import usePageTransition from '@/src/hooks/usePageTransition';
import styles from './index.module.css';

const Home: NextPage = () => {

  const { pageTransitionTo } = usePageTransition();

  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    if (!loggedInUser) pageTransitionTo('/login', { redirectType: 'replace', duration: 0 });
  }, [loggedInUser, pageTransitionTo]);

  return (
    <div className={ styles.overallContainer }>

    </div>
  );
};

export default Home;
