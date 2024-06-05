import { createSelector, createSignal } from "solid-js";
import styles from "../styles/curve.module.css";
import ControlPoint from "./ControlPoint";
import utils from "./utils";

const DrawCurve = () => {
  const startPoint = { x: 30, y: 100 };
  const controlPoint1 = new ControlPoint(90, 80, "1");
  const controlPoint2 = new ControlPoint(150, 190, "2");
  const endPoint = { x: 220, y: 200 };
  const numPoints = 10;

  const curvePoints = utils.bezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, numPoints);

  const [selectedId, setSelectedId] = createSignal();
  const isSelected = createSelector(selectedId);

  return (
    <>
      <div class={styles.pointContainer}>
        <svg class={styles.curveViewBox} viewBox="30 0 200 300" width="90%" height="90%">
          {controlPoint1.render(isSelected, () => onControlPointClicked(controlPoint1.id))}
          {controlPoint2.render(isSelected, () => onControlPointClicked(controlPoint2.id))}
          {RenderCurve(curvePoints)}
        </svg>
      </div>
    </>
  );

  function onControlPointClicked(id) {
    setSelectedId(id);
    console.log(id);
  }
};

const RenderCurve = (curvePoints) => {
  const lines = [];

  for (let i = 0; i < curvePoints.length - 1; i++) {
    const point1 = curvePoints[i];
    const point2 = curvePoints[i + 1];

    lines.push(
      <>
        <line x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} stroke="#Cf509F" stroke-width="2px" />
        {i > 0 && <circle key={i} cx={point1.x} cy={point1.y} r="2" fill="white" />}
      </>,
    );
  }

  lines.push(createPoint(curvePoints[0]));
  lines.push(createPoint(curvePoints[curvePoints.length - 1]));

  return lines;
};

const createPoint = (point) => {
  return <circle cx={point.x} cy={point.y} r="3" fill="white" />;
};

export default DrawCurve;
