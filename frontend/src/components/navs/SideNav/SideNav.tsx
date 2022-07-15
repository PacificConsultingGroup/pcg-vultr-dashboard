
import styles from './SideNav.module.css';

interface SideNavProps {

  className?: string;
}

export default function SideNav(props: SideNavProps) {

  return (
    <div className={ `${styles.overallContainer} ${props.className}` }>
      I am the SideNav!
    </div>
  );
}