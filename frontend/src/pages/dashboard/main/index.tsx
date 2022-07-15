
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';
import LayoutWithTopNav from '@/src/layouts/LayoutWithTopNav/LayoutWithTopNav';
import LayoutWithSideNav from '@/src/layouts/LayoutWithSideNav/LayoutWithSideNav';
import styles from './index.module.css';

const DashboardMainPage: NextPageWithLayout = () => {
  return (
    <p>hello world</p>
  );
};

DashboardMainPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutWithTopNav>
      <LayoutWithSideNav>
        { page }
      </LayoutWithSideNav>
    </LayoutWithTopNav>
  );
};

export default DashboardMainPage;