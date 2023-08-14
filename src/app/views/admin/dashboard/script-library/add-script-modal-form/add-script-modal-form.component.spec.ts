import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScriptModalFormComponent } from './add-script-modal-form.component';

describe('AddScriptModalFormComponent', () => {
  let component: AddScriptModalFormComponent;
  let fixture: ComponentFixture<AddScriptModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScriptModalFormComponent]
    });
    fixture = TestBed.createComponent(AddScriptModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
