import { Show, createEffect, createSignal } from "solid-js";
import styles from "../styles/curve.module.css";

export default class ControlPoint {
  static count = 0;
  id = 0;

  position;
  setPosition;

  constructor(x, y, title = "") {
    [this.position, this.setPosition] = createSignal({ x: x, y: y });
    this.title = title;
    this.hovering = false;

    this.id = ControlPoint.count;
    ControlPoint.count++;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point) {
    return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  clone() {
    return new ControlPoint(this.x, this.y);
  }

  render(isSelected, onclicked) {
    const [isHovering, setHovering] = createSignal(false);

    const handler = (data, event) => {
      data === "mouseenter" ? setHovering(true) : setHovering(false);

      if (data?.type === "mouseenter") {
        setHovering(true);
        this.hovering = true;
      } else if (data?.type === "mouseleave") {
        setHovering(false);
      }
    };

    return (
      <svg>
        <rect
          onmousedown={onclicked}
          onmouseenter={handler}
          onmouseleave={handler}
          class={styles.controlPoint}
          width="8"
          height="8"
          x={this.position().x}
          y={this.position().y}
          rx="10"
          ry="10"
        />

        <Show when={isSelected(this.id)}>
          <text x={this.position().x - 12} y={this.position().y - 5} font-size="10px" font-weight="500">
            {this.id}
          </text>
        </Show>
      </svg>
    );
  }
}
