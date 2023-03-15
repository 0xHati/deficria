import { Menu } from './Menu';
import styles from './NavBar.module.scss';

export const NavBar = ({ show, onClickMenuItem }) => {
  return (
    <div className={`${styles.navbar} ${show ? styles['navbar--open'] : ''}`}>
      <Menu onClickMenuItem={onClickMenuItem} />
    </div>
  );
};
