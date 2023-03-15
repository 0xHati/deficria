import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';

export const Menu = ({ onClickMenuItem }) => {
  return (
    <>
      <ul className={`${styles.menu}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClickMenuItem}>
          Home
        </NavLink>
        <NavLink
          to="fees"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClickMenuItem}>
          Fees
        </NavLink>
        <NavLink
          to="tvl"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClickMenuItem}>
          TVL
        </NavLink>
        <NavLink
          to="volumes"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClickMenuItem}>
          Volumes
        </NavLink>
      </ul>
    </>
  );
};
