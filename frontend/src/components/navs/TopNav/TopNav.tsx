
import styles from './TopNav.module.css';

interface TopNavProps {

  className?: string;
}

export default function TopNav(props: TopNavProps) {

  return (
    <div className={ `${styles.overallContainer} ${props.className}` }>
      I am the TopNav!
    </div>
  );
}