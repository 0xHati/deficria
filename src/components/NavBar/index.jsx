import { Menu } from "./Menu";
import styles from "./NavBar.module.scss";

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div>Defi Cria</div>
      <Menu />
      <div>Profile</div>
    </div>
  );
};
