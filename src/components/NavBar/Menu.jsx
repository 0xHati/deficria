import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <ul className={styles.menu}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "undefined")}>
        Home
      </NavLink>

      <NavLink
        to="fees"
        className={({ isActive }) => (isActive ? styles.active : "undefined")}>
        Fees
      </NavLink>
      <NavLink to="test">TVL</NavLink>
      <NavLink>Coins</NavLink>
      <NavLink>Volumes</NavLink>
    </ul>
  );
};
