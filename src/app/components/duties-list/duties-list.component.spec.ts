import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DutiesListComponent } from "./duties-list.component";

describe("DutiesListComponent", () => {
  let component: DutiesListComponent;
  let fixture: ComponentFixture<DutiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DutiesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DutiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
