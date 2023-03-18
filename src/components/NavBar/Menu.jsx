import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';

export const Menu = ({ onClickMenuItem }) => {
  return (
    <>
      <ul className={`${styles.menu}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={onClickMenuItem}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="fees"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={onClickMenuItem}>
            Fees
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tvl"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={onClickMenuItem}>
            TVL
          </NavLink>
        </li>
        <li>
          <NavLink
            to="volumes"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={onClickMenuItem}>
            Volumes
          </NavLink>
        </li>
      </ul>
    </>
  );
};
