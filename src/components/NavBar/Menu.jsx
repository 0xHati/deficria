import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <>
      <ul className={styles.menu}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "undefined")}>
          Home
        </NavLink>
        <NavLink
          to="protocols"
          className={({ isActive }) => (isActive ? styles.active : "undefined")}>
          Protocols
        </NavLink>
        <NavLink
          to="fees"
          className={({ isActive }) => (isActive ? styles.active : "undefined")}>
          Fees
        </NavLink>

        <NavLink
          to="tvl"
          className={({ isActive }) => (isActive ? styles.active : "undefined")}>
          TVL
        </NavLink>
        <NavLink
          to="volumes"
          className={({ isActive }) => (isActive ? styles.active : "undefined")}>
          Volumes
        </NavLink>
      </ul>
    </>
  );
};
