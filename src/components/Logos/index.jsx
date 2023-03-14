import { slug } from '../../utils/helpers';

import styles from './Logos.module.scss';

const iconsToShow = 5;

export const Logos = ({ protocolNames }) => {
  return (
    <ul className={styles.logos}>
      {protocolNames.slice(0, iconsToShow).map((item, index) => {
        const slugProtocol = slug(item) === 'bsc' ? 'binance' : slug(item);
        return (
          <li
            key={item}
            style={{ zIndex: protocolNames.length - index }}>
            <img
              className={styles.logo}
              src={`https://icons.llama.fi/chains/rsz_${slugProtocol}.jpg`}
              alt={`${item} logo`}
              title={item}
            />
          </li>
        );
      })}
      {protocolNames.length > iconsToShow && (
        <>
          <li className={styles['logo__dots']}>...</li>
          <li
            className={styles['logo--extra']}
            key={'more'}
            style={{ zIndex: iconsToShow + 1 }}>
            <span>+{protocolNames.length - iconsToShow}</span>
          </li>
        </>
      )}
    </ul>
  );
};
