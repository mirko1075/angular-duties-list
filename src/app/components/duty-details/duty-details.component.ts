import { Component, createPlatform, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
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
  public updateDutyForm: FormGroup = new FormGroup({});
  public message: String = "";
  public dutyId: String = "";
  public dutiesIds: Array<String> = new Array<String>();

  constructor(
    private dutyService: DutyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = "";
    this.retrieveDuties();
    this.getDuty(this.route.snapshot.params["id"])
      .then((result) => {
        console.log("Duty loaded");
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  private validateId(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isIdValid = !this.dutiesIds
        .filter((d) => d !== this.currentDuty.Id)
        .find((dutyId: String) => dutyId === control.value);

      return !isIdValid ? { idValidErr: true } : null;
    };
  }

  private retrieveDuties(): void {
    this.dutyService.getAll().subscribe({
      next: (data) => {
        data.forEach((duty) => this.dutiesIds.push(duty.Id));

        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  public async getDuty(id: String): Promise<void> {
    await this.dutyService.get(id).subscribe({
      next: (data) => {
        this.currentDuty = data;
        this.dutyId = this.currentDuty?.Id;
      },
      complete: () => {
        this.createForm();
      },
      error: (e) => console.error(e),
    });
  }

  private createForm(): void {
    if (!this.currentDuty) return;
    this.updateDutyForm = new FormGroup({
      Id: new FormControl(this.currentDuty.Id, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4),
        this.validateId(),
      ]),
      Name: new FormControl(this.currentDuty.Name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
  }

  public updateDuty(): void {
    this.message = "";
    this.dutyService.update(this.dutyId, this.updateDutyForm.value).subscribe({
      next: (res) => {
        this.message = res.message
          ? res.message
          : "This Duty was updated successfully!";
      },
      error: (e) => console.error(e),
    });
  }

  public deleteDuty(): void {
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
