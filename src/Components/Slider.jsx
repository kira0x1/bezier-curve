import styles from "../styles/curve.module.css";

const Slider = (props) => {
  const resolution = props.resolution;
  const setResolution = props.setResolution;

  function onInput() {
    setResolution(this.value);
  }

  return (
    <slider class={styles.slider}>
      <p>{resolution()}</p>
      <input type="range" min={1} max={20} value={resolution()} oninput={onInput}>
        {resolution()}
      </input>
    </slider>
  );
};

export default Slider;
