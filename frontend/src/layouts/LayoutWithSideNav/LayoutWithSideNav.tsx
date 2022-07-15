
import SideNav from '@/src/components/navs/SideNav/SideNav';
import { ReactNode } from 'react';
import styles from './LayoutWithSideNav.module.css';

interface LayoutWithSideNavProps {
  children: ReactNode;
}

export default function LayoutWithSideNav(props: LayoutWithSideNavProps) {

  return (
    <div className={ styles.overallContainer }>
      <SideNav />
      { props.children }
    </div>
  );
}