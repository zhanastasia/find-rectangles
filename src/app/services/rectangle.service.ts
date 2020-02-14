import { Injectable } from "@angular/core";

import { Point } from "./../models/point.model";
import { Quadrilateral } from "./../models/quadrilateral.model";

@Injectable({
  providedIn: "root"
})
export class RectangleService {
  findRectangles(pointsArray: Point[]): Quadrilateral[] {
    if (!pointsArray) {
      throw { message: "Array of points is empty or not exist" };
    }

    if (pointsArray.length === 0) {
      return [];
    }

    const result: Quadrilateral[] = [];
    const rectangleCandidates = new Map<string, Quadrilateral>();

    for (let i = 0; i < pointsArray.length; i++) {
      for (let j = 1; j < pointsArray.length; j++) {
        for (let k = 2; k < pointsArray.length; k++) {
          for (let g = 3; g < pointsArray.length; g++) {
            // skip cases with the same point --> example [1,1,2,3]
            if (
              i === j ||
              i === k ||
              i === g ||
              j === k ||
              j === g ||
              k === g
            ) {
              continue;
            }

            // skip cases with the same point on the different positions --> example [1,2,3,4] and [1,2,4,3]
            let key: string = [i, j, k, g].sort().join(", ");
            if (rectangleCandidates.has(key)) {
              continue;
            }

            let quadrilateral = new Quadrilateral(
              pointsArray[i],
              pointsArray[j],
              pointsArray[k],
              pointsArray[g]
            );
            rectangleCandidates.set(key, quadrilateral);

            const AB: number = this.sideLength(
              quadrilateral.A,
              quadrilateral.B
            );
            const BC: number = this.sideLength(
              quadrilateral.B,
              quadrilateral.C
            );
            const CD: number = this.sideLength(
              quadrilateral.C,
              quadrilateral.D
            );
            const DA: number = this.sideLength(
              quadrilateral.D,
              quadrilateral.A
            );
            const AC: number = this.sideLength(
              quadrilateral.A,
              quadrilateral.C
            );
            const BD: number = this.sideLength(
              quadrilateral.B,
              quadrilateral.D
            );

            if (this.isRectangle(AB, CD, BC, DA, BD, AC)) {
              result.push(quadrilateral);
            }
          }
        }
      }
    }

    return result;
  }

  private sideLength(pointA: Point, pointB: Point): number {
    return Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );
  }

  private isRectangle(
    AB: number,
    CD: number,
    BC: number,
    DA: number,
    BD: number,
    AC: number
  ): boolean {
    // condition for parallelogram
    if (AB === CD && (BC === DA || BD === AC)) {
      // condition for rectangle
      if (AC === BD || DA === BC) {
        return true;
      }
    }
    return false;
  }
}
