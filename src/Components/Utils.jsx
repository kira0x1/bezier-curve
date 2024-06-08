// Define the Bezier curve function
function bezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, numPoints) {
  const points = [];

  for (let t = 0; t <= 1; t += 1 / numPoints) {
    const x =
      Math.pow(1 - t, 3) * startPoint.x +
      3 * Math.pow(1 - t, 2) * t * controlPoint1.position().x +
      3 * (1 - t) * Math.pow(t, 2) * controlPoint2.position().x +
      Math.pow(t, 3) * endPoint.x;

    const y =
      Math.pow(1 - t, 3) * startPoint.y +
      3 * Math.pow(1 - t, 2) * t * controlPoint1.position().y +
      3 * (1 - t) * Math.pow(t, 2) * controlPoint2.position().y +
      Math.pow(t, 3) * endPoint.y;

    points.push({ x, y });
  }

  return points;
}

const renderCurve = (curvePoints) => {
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

const Utils = {
  bezierCurve,
  renderCurve,
  createPoint,
};

export default Utils;
