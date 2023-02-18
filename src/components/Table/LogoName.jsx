import styles from "./Table.module.scss";

export const LogoName = ({ logoSrc, value }) => {
  return (
    <span className={styles.info}>
      <img
        src={logoSrc}
        alt={value + " image"}
        className={styles.logo}
      />
      <span>{value}</span>
    </span>
  );
};
