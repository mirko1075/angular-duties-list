import { Component, OnInit } from "@angular/core";
import { Duty } from "src/app/models/duty.model";
import { DutyService } from "src/app/services/duty.service";
@Component({
  selector: "app-duties-list",
  templateUrl: "./duties-list.component.html",
  styleUrls: ["./duties-list.component.css"],
})
export class DutiesListComponent implements OnInit {
  public duties: Duty[] = new Array<Duty>();
  public currentDuty: Duty = new Duty("", "");
  public currentIndex = -1;

  constructor(private dutyService: DutyService) {}

  ngOnInit(): void {
    this.retrieveDuties();
  }

  private retrieveDuties(): void {
    this.dutyService.getAll().subscribe({
      next: (data) => {
        this.duties = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  public setActiveDuty(duty: Duty, index: number): void {
    if (this.currentDuty.Id === "") {
      this.currentDuty = duty;
      this.currentIndex = index;
    } else {
      this.currentDuty = new Duty("", "");
      this.currentIndex = -1;
    }
  }
}
