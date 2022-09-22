import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DutyService } from "./duty.service";
import { mockDutyArray, mockDuty } from "../../mocks/mockDuties";
import { Duty } from "../models/duty.model";

describe("DutyService", () => {
  let service: DutyService;
  let httpController: HttpTestingController;
  let url = "http://localhost:3000/api";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DutyService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call getAllDuties and return an array of Duties", () => {
    // 1
    service.getAll().subscribe((res) => {
      //2
      expect(res).toEqual(mockDutyArray);
    });

    //3
    const req = httpController.expectOne({
      method: "GET",
      url: `${url}/duties`,
    });

    //4
    req.flush(mockDutyArray);
  });

  it("should call get Duty by Id and return the appropriate Duty", () => {
    // Arrange
    const id = "1";

    // Act
    service.get(id).subscribe((data) => {
      // Assert
      expect(data).toEqual(mockDuty);
    });

    const req = httpController.expectOne({
      method: "GET",
      url: `${url}/duties/${id}`,
    });

    req.flush(mockDuty);
  });

  it("should call update Duty and return the updated Duty from the API", () => {
    const id = "zzzz";
    const updatedDuty: Duty = {
      Id: "zzzz",
      Name: "zzzz",
    };

    service.update(id, mockDuty).subscribe((data) => {
      expect(data).toEqual(updatedDuty);
    });

    const req = httpController.expectOne({
      method: "PUT",
      url: `${url}/duties/${id}`,
    });

    req.flush(updatedDuty);
  });

  it("should call delete Duty and return the deleted Duty from the API", () => {
    const id = "zzzz";
    const deletedDuty: Duty = {
      Id: "zzzz",
      Name: "zzzz",
    };

    service.delete(id).subscribe((data) => {
      expect(data).toEqual(deletedDuty);
    });

    const req = httpController.expectOne({
      method: "DELETE",
      url: `${url}/duties/${id}`,
    });

    req.flush(deletedDuty);
  });
});
