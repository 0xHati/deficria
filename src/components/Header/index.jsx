import { NavBar } from "../NavBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icon.png";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const header = useRef(null);
  useEffect(() => {
    const scrollListener = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  //close menu after pathchanges
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles["header--sticky"] : ""}`}
      ref={header}>
      <div
        className={styles.logo}
        onClick={() => navigate("/")}>
        <span className={styles["logo--name"]}>Defi</span>
        <img
          src={logo}
          className={styles["logo--icon"]}
        />
        <span className={styles["logo--name"]}>Cria</span>
      </div>

      <button
        className={styles["menu__button"]}
        onClick={handleClick}>
        {!isOpen && <RxHamburgerMenu className={styles["menu__icon"]} />}
        {isOpen && <AiOutlineClose className={styles["menu__icon"]} />}
      </button>
      <NavBar show={isOpen} />
    </header>
  );
};
