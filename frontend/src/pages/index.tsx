import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLoggedInUser from '@/src/hooks/useLoggedInUser';
import styles from './index.module.css';

const Home: NextPage = () => {

  const { loggedInUser } = useLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) router.replace('/login');
  }, [loggedInUser, router]);

  return (
    <div className={ styles.overallContainer }>

    </div>
  );
};

export default Home;
