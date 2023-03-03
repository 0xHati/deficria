import styles from "./Hero.module.scss";
import { useEffect } from "react";
import { Background } from "./Background";

export const Hero = () => {
  return (
    <>
      <div className={styles.hero}>
        <h1>
          Track <span>240</span> crypto projects
        </h1>
        <h2>Gather insights</h2>
        <Background />
      </div>
    </>
  );
};
