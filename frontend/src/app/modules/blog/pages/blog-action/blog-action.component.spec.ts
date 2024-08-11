import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogActionComponent } from './blog-action.component';

describe('BlogActionComponent', () => {
  let component: BlogActionComponent;
  let fixture: ComponentFixture<BlogActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
