import styles from "../styles/App.module.css";

const Button = (props) => {
  const text = props.text;
  return (
    <button onclick={props.onclick} class={styles.Button}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
