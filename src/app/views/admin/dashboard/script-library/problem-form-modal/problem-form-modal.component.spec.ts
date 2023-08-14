import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemFormModalComponent } from './problem-form-modal.component';

describe('ProblemFormModalComponent', () => {
  let component: ProblemFormModalComponent;
  let fixture: ComponentFixture<ProblemFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemFormModalComponent]
    });
    fixture = TestBed.createComponent(ProblemFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
