import { Point } from "./point.model";

export class Quadrilateral {
  A: Point;
  B: Point;
  C: Point;
  D: Point;

  constructor(A: Point, B: Point, C: Point, D: Point) {
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
  }
}
