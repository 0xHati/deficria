import styles from "./Hero.module.scss";
import { Background } from "./Background";

import { fetchData } from "../../utils/helpers";
import { useQuery } from "react-query";
import defillama from "defillama-api";
import { animated, useSpring } from "@react-spring/web";

export const Hero = () => {
  const { data } = useQuery(["protocols"], () => fetchData(defillama.tvl.protocols()));

  const numberProtocols = data.length;
  console.log(numberProtocols);

  return (
    <>
      <div className={styles.hero}>
        <h1>
          Tracking{" "}
          <AnimatedNumber
            value={numberProtocols}
            className={styles.accent}
          />
          <span> crypto projects</span>
        </h1>
        <h2>
          <span className={styles.underline}>Analyse</span> the market
        </h2>
        <Background />
      </div>
    </>
  );
};

const AnimatedNumber = ({ value, className }) => {
  const { number } = useSpring({
    number: value,
    from: { number: 0 },
    delay: 200,

    config: { mass: 1, tension: 100, friction: 30 },
  });

  return <animated.span className={className}>{number.to((n) => n.toFixed(0))}</animated.span>;
};
