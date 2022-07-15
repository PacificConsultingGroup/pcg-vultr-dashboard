
import { ReactNode } from 'react';
import TopNav from '@/src/components/navs/TopNav/TopNav';
import styles from './LayoutWithTopNav.module.css';

interface LayoutWithTopNavProps {
  children: ReactNode;
}

export default function LayoutWithTopNav(props: LayoutWithTopNavProps) {

  return (
    <div className={ styles.overallContainer }>
      <TopNav />
      { props.children }
    </div>
  );
}