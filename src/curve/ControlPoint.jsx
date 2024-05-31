import styles from "../styles/curve.module.css";

export default class ControlPoint {
  constructor(x, y, title = "") {
    this.x = x;
    this.y = y;
    this.title = title;
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

  render() {
    return (
      <>
        <rect class={styles.controlPoint} width="15" height="15" x={this.x + 30} y={this.y - 40} rx="10" ry="10" />
        <text x={this.x + 60} y={this.y - 45} stroke="white">
          {this.title}
        </text>
      </>
    );
  }
}
