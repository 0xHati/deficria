import styles from './Table.module.scss';

export const LogoName = ({ logoSrc, value, rank }) => {
  return (
    <span className={styles.info}>
      {rank && <span>{rank}</span>}
      <img
        src={logoSrc}
        alt={value + ' image'}
        className={styles.logo}
      />
      <span className={styles.name}>{value}</span>
    </span>
  );
};
