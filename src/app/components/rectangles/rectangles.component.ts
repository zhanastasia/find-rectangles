import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { Point } from "./../../models/point.model";
import { Quadrilateral } from "./../../models/quadrilateral.model";
import { RectangleService } from "./../../services/rectangle.service";

@Component({
  selector: "app-rectangles",
  templateUrl: "./rectangles.component.html",
  styleUrls: ["./rectangles.component.css"]
})
export class RectanglesComponent implements OnInit {
  rectangles: Quadrilateral[];
  isFileSelected: boolean = false;

  constructor(
    private rectangleService: RectangleService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onFileUpload(event: Event) {
    this.isFileSelected = true;
    let pointsArray: Point[];

    if (event.target["files"] && event.target["files"][0]) {
      const reader = new FileReader();

      reader.onload = e => {
        const result = e.target["result"];
        try {
          pointsArray = JSON.parse(result.toString());
        } catch {
          this.toastr.error("Array of points is empty or not exist");
          this.isFileSelected = false;
        }

        this.findRectangles(pointsArray);
      };

      reader.readAsText(event.target["files"][0]);
    }
  }

  findRectangles(pointsArray: Point[]) {
    setTimeout(() => {
      this.rectangles = this.rectangleService.findRectangles(pointsArray);
    }, 100);
  }
}
