import { Component, Input, OnInit } from "@angular/core";
import { DutyService } from "src/app/services/duty.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Duty } from "src/app/models/duty.model";
@Component({
  selector: "app-duty-details",
  templateUrl: "./duty-details.component.html",
  styleUrls: ["./duty-details.component.css"],
})
export class DutyDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentDuty: Duty = {
    Id: "",
    Name: "",
  };

  message = "";
  constructor(
    private dutyService: DutyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = "";
      this.getDuty(this.route.snapshot.params["id"]);
    }
  }
  getDuty(id: string): void {
    this.dutyService.get(id).subscribe({
      next: (data) => {
        this.currentDuty = data;
        console.log("data", data);
      },
      error: (e) => console.error(e),
    });
  }
  updatePublished(status: boolean): void {
    const data = {
      Id: this.currentDuty.Id,
      Name: this.currentDuty.Name,
    };
    this.message = "";
    this.dutyService.update(this.currentDuty.Id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : "The status was updated successfully!";
      },
      error: (e) => console.error(e),
    });
  }
  updateDuty(): void {
    this.message = "";
    this.dutyService.update(this.currentDuty.Id, this.currentDuty).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : "This Duty was updated successfully!";
      },
      error: (e) => console.error(e),
    });
  }
  deleteDuty(): void {
    this.dutyService.delete(this.currentDuty.Id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/duties"]);
      },
      error: (e) => console.error(e),
    });
  }
}
