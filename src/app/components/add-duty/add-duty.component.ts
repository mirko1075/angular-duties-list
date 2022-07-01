import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  constructor(private dutyService: DutyService) {}
  ngOnInit(): void {
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
  saveDuty(): void {
    console.log("data", this.addDutyForm.value);
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
    this.duty = {
      Id: "",
      Name: "",
    };
  }
  get Id() {
    return this.addDutyForm.get("Id");
  }

  get Name() {
    return this.addDutyForm.get("Name");
  }
}
