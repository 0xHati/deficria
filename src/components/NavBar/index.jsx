import { Menu } from "./Menu";
import styles from "./NavBar.module.scss";

export const NavBar = ({ show }) => {
  return (
    <div className={`${styles.navbar} ${show ? styles["navbar--open"] : ""}`}>
      <Menu />
    </div>
  );
};
