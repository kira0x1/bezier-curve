import styles from "./App.module.css";
import DrawCurve from "./curve/drawCurve";

function App() {
	return (
		<div class={styles.App}>
			<header class={styles.header}>CURVE</header>
			<content class={styles.content}>
				<DrawCurve />
			</content>
		</div>
	);
}

export default App;
