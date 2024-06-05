import { Show, createSignal } from "solid-js";
import styles from "../styles/curve.module.css";

const PointTest = (props) => {
  const [isHovering, setHovering] = createSignal(false);
  const { x, y, id } = props;
  console.log(x, y);
  const isSelected = props.isSelected;

  const handler = (data, event) => {
    if (data?.type === "mouseenter") {
      setHovering(true);
    } else if (data?.type === "mouseleave") {
      setHovering(false);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <svg>
        <rect
          onmouseenter={handler}
          onmouseleave={handler}
          onmousedown={props.onclicked}
          class={styles.controlPoint}
          width="8"
          height="8"
          x={x}
          y={y}
          rx="10"
          ry="10"
        />
        <Show when={isSelected(id)}>
          <text x={x - 12} y={y - 5} font-size="10px" font-weight="500">
            {id}
          </text>
        </Show>
      </svg>
    </>
  );
};

export default PointTest;
