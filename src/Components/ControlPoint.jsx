import { Show, createSignal } from "solid-js";
import styles from "../styles/curve.module.css";

export default class ControlPoint {
  static count = 0;
  id = 0;

  position;
  setPosition;

  constructor(id, x, y, title = "") {
    [this.position, this.setPosition] = createSignal({ x: x, y: y });
    this.title = title;
    this.hovering = false;

    this.id = id;
    // this.id = ControlPoint.count;
    // ControlPoint.count++;
  }

  move(x = 0, y = 0) {
    if (x == 0 && y == 0) {
      console.log("not gonna move cus zero zero");
      return;
    }

    const xd = this.position().x + x / 1.35;
    const yd = this.position().y + y / 1.35;

    this.setPosition({ x: xd, y: yd });
  }

  clamp(min, max) {
    return Math.min(Math.max(this, min), max);
  }

  render(isDragging, onclicked) {
    return (
      <svg>
        <rect
          onmousedown={onclicked}
          class={styles.controlPoint}
          width="8"
          height="8"
          x={this.position().x}
          y={this.position().y}
          style={isDragging() ? { "pointer-events": "none" } : { "pointer-events": "all" }}
          rx="10"
          ry="10"
        />

        {/* <Show when={isSelected(this.id)}>
          <text
            x={this.position().x - 12}
            y={this.position().y - 5}
            font-size="10px"
            font-weight="500"
            style={{ "user-select": "none" }}
          >
            {this.id}
          </text>
        </Show> */}
      </svg>
    );
  }
}
