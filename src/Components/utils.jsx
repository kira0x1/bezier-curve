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

const Utils = {
  bezierCurve: bezierCurve,
};

export default Utils;
