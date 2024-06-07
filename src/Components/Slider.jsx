import styles from "../styles/curve.module.css";

const Slider = (props) => {
  const lineStore = props.lineStore;
  const setLineStore = props.setLineStore;

  function onInput() {
    setLineStore({ resolution: this.value });
  }

  return (
    <slider class={styles.slider}>
      <p>{lineStore.resolution}</p>
      <input type="range" min={1} max={20} value={lineStore.resolution} oninput={onInput}>
        {lineStore.resolution}
      </input>
    </slider>
  );
};

export default Slider;
