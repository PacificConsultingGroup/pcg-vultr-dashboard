import BaseButton from '@/src/components/common/BaseButton';
import { NextPage } from 'next';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './index.module.css';

const TestPage: NextPage = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={ styles.overallContainer }>
      <BaseButton
        iconJSX={ <Icon icon="carbon:document" /> }
        isLoading={ isLoading }
        disableWhileLoading={ true }
        clickHandler={ () => { setIsLoading(x => !x); } }
      />
    </div>
  );
};

export default TestPage;