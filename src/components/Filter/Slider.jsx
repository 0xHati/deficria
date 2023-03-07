import styles from "./Filter.module.scss";
import ReactSlider from "react-slider";

const Slider = ({ min, max, value }) => {
  return (
    <div class={styles.slider}>
      <input
        type="number"
        value={min}
        className={styles["slider__input"]}
      />
      <ReactSlider
        className="slider"
        thumbClassName="slider__thumb"
        trackClassName="slider__track"
        defaultValue={[0, 100]}
        pearling
        minDistance={10}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}></div>}
      />

      <input
        type="number"
        className={styles["slider__input"]}
        value={max}
      />
    </div>
  );
};

export default Slider;
