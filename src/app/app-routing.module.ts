import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RectanglesComponent } from "./components/rectangles/rectangles.component";

const routes: Routes = [{ path: "", component: RectanglesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
