import styles from "../App.module.css";
import bezierCurve from "./bezierCurve";

const DrawCurve = () => {
	const startPoint = { x: 10, y: 10 };
	const controlPoint1 = { x: 110, y: 50 };
	const controlPoint2 = { x: 200, y: 150 };
	const endPoint = { x: 300, y: 200 };
	const numPoints = 10;

	const curvePoints = bezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, numPoints);

	return (
		<>
			<div class={styles.pointContainer}>
				<svg viewBox='0 0 600 200' width='800' height='600'>
					{RenderControlPoint(controlPoint1, "1")}
					{RenderControlPoint(controlPoint2, "2")}
					{RenderCurve(curvePoints)}
				</svg>
			</div>
		</>
	);
};

const RenderControlPoint = (controlPoint, title) => {
	const { x, y } = controlPoint;
	return (
		<>
			<rect
				width='15'
				height='15'
				x={x + 30}
				y={y - 40}
				rx='10'
				ry='10'
				style='fill:rgb(255,255,255,0.3);stroke:white;stroke-width:3;opacity:0.6'
			/>
			<text x={x + 60} y={y - 45} stroke='white'>
				{title}
			</text>
		</>
	);
};

const RenderCurve = (curvePoints) => {
	const lines = [];

	for (let i = 0; i < curvePoints.length - 1; i++) {
		const point1 = curvePoints[i];
		const point2 = curvePoints[i + 1];

		lines.push(
			<>
				<line x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} stroke='#Cf509F' stroke-width='3px' />
				{i > 0 && <circle key={i} cx={point1.x} cy={point1.y} r='3' fill='white' />}
				{/* <circle key={i + 1} cx={point2.x} cy={point2.y} r='3' fill='white' /> */}
			</>
		);
	}

	lines.push(createPoint(curvePoints[0]));

	return lines;
};

const createPoint = (point) => {
	return <circle cx={point.x} cy={point.y} r='3' fill='white' />;
};

const curveValuesDebug = (curvePoints) => {
	return (
		<div class={styles.pointsMap}>
			{curvePoints.map((c, i) => {
				return (
					<div class={styles.pointContainer}>
						<div class={styles.pointIndex}>{i}</div>
						<div class={styles.point}>{`( ${c.x.toFixed(1)}, ${c.y.toFixed(1)} )`}</div>
					</div>
				);
			})}
		</div>
	);
};
export default DrawCurve;
