import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DutyService } from "./duty.service";

describe("DutyService", () => {
  let service: DutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DutyService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
