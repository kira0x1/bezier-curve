import styles from "./styles/App.module.css";
import DrawCurve from "./Components/CurveContainer";

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>CURVE</header>
      <DrawCurve />
    </div>
  );
}

export default App;
