import styles from "../App.module.css";
import bezierCurve from "./bezierCurve";

const DrawCurve = () => {
    const startPoint = { x: 0, y: 0 };
    const controlPoint1 = { x: 100, y: 50 };
    const controlPoint2 = { x: 200, y: 150 };
    const endPoint = { x: 300, y: 200 };
    const numPoints = 10;

    const curvePoints = bezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, numPoints);

    return (
        <>
            <div class={styles.pointsMap}>
                {RenderCurve(curvePoints)}
            </div>
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
                <circle key={i} cx={point1.x} cy={point1.y} r="1" fill="white" />
                <circle key={i + 1} cx={point2.x} cy={point2.y} r="3" fill="magenta" />
                <line x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} stroke="white" />
            </>
        );
    }

    return (
        <svg width="400" height="400">
            {lines}
        </svg>
    );
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
