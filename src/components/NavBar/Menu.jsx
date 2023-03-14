import styles from "./NavBar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Menu = () => {
  return (
    <>
      <ul className={styles.menu}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Home
        </NavLink>
        <NavLink
          to="fees"
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Fees
        </NavLink>

        <NavLink
          to="tvl"
          className={({ isActive }) => (isActive ? styles.active : "")}>
          TVL
        </NavLink>
        <NavLink
          to="volumes"
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Volumes
        </NavLink>
      </ul>
    </>
  );
};
