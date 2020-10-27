import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNumberInputFormatComponent } from './ng-number-input-format.component';

describe('NgNumberInputFormatComponent', () => {
  let component: NgNumberInputFormatComponent;
  let fixture: ComponentFixture<NgNumberInputFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgNumberInputFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgNumberInputFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
