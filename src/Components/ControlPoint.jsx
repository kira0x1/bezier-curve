import { Show, createSignal } from "solid-js";
import styles from "../styles/curve.module.css";

export default class ControlPoint {
  static count = 0;
  viewBox;
  id = 0;

  position;
  setPosition;

  constructor(id, x, y, viewBox, title = "") {
    this.viewBox = viewBox;
    [this.position, this.setPosition] = createSignal({ x: x, y: y });
    this.title = title;
    this.hovering = false;

    this.id = id;
    // this.id = ControlPoint.count;
    // ControlPoint.count++;
  }

  moveTo(x = 0, y = 0) {
    const finalPosition = this.keepInBounds(x, y);
    this.setPosition(finalPosition);
  }

  translate(x = 0, y = 0) {
    let finalX = this.position().x + x / 1.35;
    let finalY = this.position().y + y / 1.35;

    if (x == 0 && y == 0) {
      return;
    }

    this.setPosition({ x: finalX, y: finalY });
  }

  keepInBounds(wishX, wishY) {
    let finalX = wishX;
    let finalY = wishY;

    const offsetX = 0;
    const offsetY = 15;

    // check bounds
    if (wishX < -10) {
      // finalX = this.viewBox.x + offsetX;
    }

    if (wishX > this.viewBox.width - offsetX) {
      finalX = this.viewBox.width - offsetX;
    }

    if (wishY > this.viewBox.height - offsetY) {
      finalY = this.viewBox.height - offsetY;
    }

    if (wishY < this.viewBox.y + offsetX) {
      finalY = this.viewBox.y + offsetX;
    }

    return { x: finalX, y: finalY };
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
          x={this.position().x}
          y={this.position().y}
          style={isDragging() ? { "pointer-events": "none" } : { "pointer-events": "all" }}
          rx="10"
          ry="10"
        />

        <text x={this.position().x - 50} y={this.position().y - 15} class={styles.controlText} id={styles.label}>
          X
        </text>
        <text
          x={this.position().x - 22}
          y={this.position().y - 14}
          style={{ "user-select": "none" }}
          class={styles.controlText}
        >
          {this.position().x.toFixed("F1")}
        </text>
        <text x={this.position().x + 22} y={this.position().y - 15} class={styles.controlText} id={styles.label}>
          Y
        </text>
        <text
          x={this.position().x + 52}
          y={this.position().y - 14}
          style={{ "user-select": "none" }}
          class={styles.controlText}
        >
          {this.position().y.toFixed("F1")}
        </text>
      </svg>
    );
  }
}
