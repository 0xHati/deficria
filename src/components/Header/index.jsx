import { NavBar } from "../NavBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

import styles from "./Header.module.scss";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <div>Defi Cria</div>
      <button
        className={styles["menu__button"]}
        onClick={handleClick}>
        {!isOpen && <RxHamburgerMenu className={styles["menu__icon"]} />}
        {isOpen && <AiOutlineClose className={styles["menu__icon"]} />}
      </button>
      <NavBar show={isOpen} />
      <div className={styles.profile}>Profile</div>
    </header>
  );
};
