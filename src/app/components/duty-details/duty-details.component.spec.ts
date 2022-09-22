import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { DutyDetailsComponent } from "./duty-details.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("DutyDetailsComponent", () => {
  let component: DutyDetailsComponent;
  let fixture: ComponentFixture<DutyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DutyDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DutyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
