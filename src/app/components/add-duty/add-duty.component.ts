import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Duty } from "src/app/models/duty.model";
import { DutyService } from "src/app/services/duty.service";
@Component({
  selector: "app-add-duty",
  templateUrl: "./add-duty.component.html",
  styleUrls: ["./add-duty.component.css"],
})
export class AddDutyComponent implements OnInit {
  addDutyForm: FormGroup = new FormGroup({});
  duty: Duty = {
    Id: "",
    Name: "",
  };
  submitted = false;
  message: String | undefined;
  dutiesIds: String[] = new Array<String>();

  constructor(private dutyService: DutyService) {}

  ngOnInit(): void {
    this.addDutyForm = new FormGroup({
      Id: new FormControl(this.duty.Id, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4),
        this.validateId(),
      ]),
      Name: new FormControl(this.duty.Name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
    this.retrieveDuties();
  }

  validateId(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isIdValid = !this.dutiesIds.find(
        (dutyId) => dutyId === control.value
      );

      return !isIdValid ? { idValidErr: true } : null;
    };
  }

  retrieveDuties(): void {
    this.dutyService.getAll().subscribe({
      next: (data) => {
        data.forEach((duty) => this.dutiesIds.push(duty.Id));
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  async saveDuty(): Promise<void> {
    this.dutyService.create(this.addDutyForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newDuty(): void {
    this.submitted = false;
    this.addDutyForm = new FormGroup({
      Id: new FormControl(this.duty.Id, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4),
      ]),
      Name: new FormControl(this.duty.Name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
  }
  get Id() {
    return this.addDutyForm.get("Id");
  }

  get Name() {
    return this.addDutyForm.get("Name");
  }
}
