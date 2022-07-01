import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddDutyComponent } from "./components/add-duty/add-duty.component";
import { DutyDetailsComponent } from "./components/duty-details/duty-details.component";
import { DutiesListComponent } from "./components/duties-list/duties-list.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MaterialModule } from "./modules/material/material.module";
@NgModule({
  declarations: [
    AppComponent,
    AddDutyComponent,
    DutyDetailsComponent,
    DutiesListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
