import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPostComponent } from './child-post.component';

describe('ChildPostComponent', () => {
  let component: ChildPostComponent;
  let fixture: ComponentFixture<ChildPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildPostComponent]
    });
    fixture = TestBed.createComponent(ChildPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
