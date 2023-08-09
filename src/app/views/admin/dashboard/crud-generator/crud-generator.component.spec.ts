import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGeneratorComponent } from './crud-generator.component';

describe('CrudGeneratorComponent', () => {
  let component: CrudGeneratorComponent;
  let fixture: ComponentFixture<CrudGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudGeneratorComponent]
    });
    fixture = TestBed.createComponent(CrudGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
