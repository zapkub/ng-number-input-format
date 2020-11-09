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


  it('should return zero value if input field is empty', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));

    inputelem.nativeElement.value = '13.222';
    inputelem.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputelem.nativeElement.value = '';
    const event = new FocusEvent('blur');
    inputelem.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(inputelem.nativeElement.value).toEqual('0.00');
    expect(component.numberInputDirective.value).toEqual(0);
  });

  it('should replace number after decimal point if decimal percission is 2', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));
    inputelem.nativeElement.value = '19.12';
    const event = new KeyboardEvent('keydown', {
      key: '9'
    });
    inputelem.nativeElement.selectionStart = 3;
    inputelem.nativeElement.selectionEnd = 3;
    inputelem.nativeElement.dispatchEvent(event);
    /**
     * we expect 19.2 because we only remove the next number
     * after cursor if decimal point has been input during the decimal is limit
     * the number 9 will be pop-up automatically in another event
     * not in keydown event
     */
    expect(inputelem.nativeElement.value).toEqual('19.2');


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
    const event = new KeyboardEvent('keydown', {
      key: '1'
    });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    inputelem.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should allow to edit if value is reach limit length but select with more than 0 character', () => {
    const inputelem = fixture.debugElement.query(By.css('input'));
    inputelem.nativeElement.value = '1234567890123.11';
    const event = new KeyboardEvent('keydown', {
      key: '1'
    });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    inputelem.nativeElement.selectionStart = 2;
    inputelem.nativeElement.selectionEnd = 3;
    inputelem.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

});
