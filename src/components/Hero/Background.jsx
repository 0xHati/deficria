import { useRef, useEffect } from "react";
import styles from "./Hero.module.scss";

import { ReactComponent as BackgroundShape } from "../../assets/background-shape2.svg";

export const Background = () => {
  const background = useRef(null);
  const gradient = useRef(null);

  return (
    <>
      <div
        className={styles.background}
        ref={background}></div>
    </>
  );
};
