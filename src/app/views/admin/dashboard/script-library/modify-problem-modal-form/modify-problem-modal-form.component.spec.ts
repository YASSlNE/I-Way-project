import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProblemModalFormComponent } from './modify-problem-modal-form.component';

describe('ModifyProblemModalFormComponent', () => {
  let component: ModifyProblemModalFormComponent;
  let fixture: ComponentFixture<ModifyProblemModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyProblemModalFormComponent]
    });
    fixture = TestBed.createComponent(ModifyProblemModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
