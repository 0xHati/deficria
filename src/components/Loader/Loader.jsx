import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.mult2rect} ${styles.mult2rect1}`}></div>
      <div className={`${styles.mult2rect} ${styles.mult2rect2}`}></div>
      <div className={`${styles.mult2rect} ${styles.mult2rect3}`}></div>
      <div className={`${styles.mult2rect} ${styles.mult2rect4}`}></div>
      <div className={`${styles.mult2rect} ${styles.mult2rect5}`}></div>
    </div>
  );
};

export default Loader;
