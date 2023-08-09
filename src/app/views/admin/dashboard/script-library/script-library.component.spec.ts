import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptLibraryComponent } from './script-library.component';

describe('ScriptLibraryComponent', () => {
  let component: ScriptLibraryComponent;
  let fixture: ComponentFixture<ScriptLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptLibraryComponent]
    });
    fixture = TestBed.createComponent(ScriptLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
