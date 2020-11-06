import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgNumberInputFormatComponent } from './ng-number-input-format.component';
import { NgNumberInputFormatDirective } from './ng-number-input-format.directive';


describe('NgNumberInputFormatComponent', () => {
  let component: NgNumberInputFormatComponent;
  let fixture: ComponentFixture<NgNumberInputFormatComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgNumberInputFormatComponent,
        NgNumberInputFormatDirective,
      ]
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

  it('should format on blur', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));
    expect(inputelem.nativeElement.value).toEqual('0.00');
    inputelem.nativeElement.value = '1';
    inputelem.nativeElement.dispatchEvent(new Event('input'));
    expect(inputelem.nativeElement.value).toEqual('1.00');
    inputelem.nativeElement.blur();
    fixture.detectChanges();
    expect(inputelem.nativeElement.value).toEqual('1.00');
  });

  it('should deformat if focus', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));
    expect(inputelem.nativeElement.value).toEqual('0.00');
    inputelem.nativeElement.focus();
    expect(inputelem.nativeElement.value).toEqual('0');
  });

  it('should allow input if it not exceed 13,2 digits', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));
    inputelem.nativeElement.value = '123456789123.12';
    inputelem.nativeElement.dispatchEvent(new Event('input'));
    inputelem.nativeElement.focus();
    const event = new KeyboardEvent('keydown', {
      key: '1'
    });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    inputelem.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not allow input to exceed 13,2 digits', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));
    inputelem.nativeElement.value = '1234567891234.12';
    inputelem.nativeElement.dispatchEvent(new Event('input'));
    inputelem.nativeElement.focus();
    const event = new KeyboardEvent('keydown', {
      key: '1'
    });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    inputelem.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });


});
