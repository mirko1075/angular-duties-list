import { Component, createPlatform, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  updateDutyForm: FormGroup = new FormGroup({});
  message = "";

  constructor(
    private dutyService: DutyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = "";
    console.log("this.currentDuty", this.currentDuty);
    this.getDuty(this.route.snapshot.params["id"])
      .then((result) => {
        console.log("Duty loaded");
      })
      .catch((err: Error) => {
        console.log(err);
      });
    console.log("this.currentDuty", this.currentDuty);
  }

  async getDuty(id: String): Promise<void> {
    this.dutyService.get(id).subscribe({
      next: (data) => {
        this.currentDuty = data;
        console.log("data", data);
      },
      complete: () => {
        this.createForm();
      },
      error: (e) => console.error(e),
    });
  }

  createForm(): void {
    if (!this.currentDuty) return;
    this.updateDutyForm = new FormGroup({
      Id: new FormControl(this.currentDuty.Id, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4),
      ]),
      Name: new FormControl(this.currentDuty.Name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
    console.log("this.updateDutyForm", this.updateDutyForm);
  }

  updateDuty(): void {
    this.message = "";
    this.dutyService
      .update(this.currentDuty.Id, this.updateDutyForm.value)
      .subscribe({
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
    confirm("Are you sure you want to delete this item?") &&
      this.dutyService.delete(this.currentDuty.Id).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(["/duties"]);
        },
        error: (e) => console.error(e),
      });
  }
}
