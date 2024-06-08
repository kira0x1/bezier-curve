import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import styles from "../styles/curve.module.css";
import ControlPoint from "./ControlPoint";
import utils from "./Utils";
import Slider from "./Slider";
import Button from "./Button";

// gimicky optimization
let updateCount = 0;

const defaultSettings = {
  startPoint: { x: 30, y: 100 },
  controlPoint1: { x: 90, y: 80 },
  controlPoint2: { x: 150, y: 190 },
  endPoint: { x: 220, y: 200 },
  resolution: 10,
};

const DrawCurve = () => {
  let startPoint = { x: 30, y: 100 };
  const controlPoint1 = new ControlPoint(0, 90, 80, "1");
  const controlPoint2 = new ControlPoint(1, 150, 190, "2");
  let endPoint = { x: 220, y: 200 };

  const getCurvePoints = (res) => utils.bezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, res);

  const [lineStore, setLineStore] = createStore({ curvePoints: [], resolution: 10 });
  setLineStore({ curvePoints: getCurvePoints(10) });

  const cpoints = [controlPoint1, controlPoint2];

  createEffect((prev) => {
    if (prev && lineStore.resolution !== prev) {
      setLineStore({ curvePoints: getCurvePoints(lineStore.resolution) });
    }
    return lineStore.resolution;
  }, lineStore.resolution);

  const [hasSelection, setHasSelection] = createSignal(false);
  const [isDraggging, setDragging] = createSignal(false);
  const [selectedId, setSelectedId] = createSignal();

  // handle moving control points
  function onMouseMove(e) {
    updateCount++;
    if (hasSelection()) {
      cpoints[selectedId()].translate(e.movementX, e.movementY);

      if (updateCount >= 10000) updateCount = 0;
      if (updateCount % 2) {
        setLineStore({ curvePoints: getCurvePoints(lineStore.resolution) });
      }
    }
  }

  function onClick(e) {
    // if were dragging then deselect and drop the object
    if (hasSelection()) {
      updateCount = 0;
      setHasSelection(false);
      setDragging(false);
    }
  }

  function resetCurve() {
    setLineStore({ resolution: defaultSettings.resolution });
    controlPoint1.setPosition(defaultSettings.controlPoint1);
    controlPoint2.setPosition(defaultSettings.controlPoint2);
    setLineStore({ curvePoints: getCurvePoints(lineStore.resolution) });
  }

  return (
    <>
      <Slider lineStore={lineStore} setLineStore={setLineStore}></Slider>
      <div class={styles.curveContainer}>
        <svg
          on:mousemove={onMouseMove}
          on:mousedown={onClick}
          class={styles.curveViewBox}
          viewBox="30 0 200 300"
          width="90%"
          height="90%"
        >
          {controlPoint1.render(isDraggging, () => onControlPointClicked(0))}
          {controlPoint2.render(isDraggging, () => onControlPointClicked(1))}
          {utils.renderCurve(lineStore.curvePoints)}
        </svg>
      </div>
      <Button text="RESET" onclick={resetCurve} />
    </>
  );

  function onControlPointClicked(id) {
    setSelectedId(id);
    setDragging(true);
    setHasSelection(true);
  }
};

export default DrawCurve;
