import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DutiesListComponent } from "./components/duties-list/duties-list.component";
import { AddDutyComponent } from "./components/add-duty/add-duty.component";
import { DutyDetailsComponent } from "./components/duty-details/duty-details.component";
const routes: Routes = [
  { path: "", redirectTo: "duties", pathMatch: "full" },
  { path: "duties", component: DutiesListComponent },
  { path: "duties/:id", component: DutyDetailsComponent },
  { path: "add", component: AddDutyComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
