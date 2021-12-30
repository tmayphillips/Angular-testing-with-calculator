import { IterableDiffers } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for element rendering', () => {
    const compiled = fixture.nativeElement as HTMLElement
    const input = compiled.querySelector('input')
    expect(input).toBeTruthy()

    const requiredButtons:string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', 'C', '='];
    const buttons:string[] = []
    compiled.querySelectorAll('button').forEach(button => {
      expect(button.disabled).toBeFalsy();
      buttons.push(button.innerText);
    })
    requiredButtons.forEach(element => {
      expect(buttons).toContain(element)
    })
  })

  it('should check functionality of addValue()', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement
    const inputElement = compiled.querySelector('input')
    app.addValue(5)
    fixture.detectChanges();
    expect(inputElement?.value).toBe('5')
  })

  it('should check functionality of addOpernad()', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement
    const inputElement = compiled.querySelector('input')
    app.num1 = 17
    app.addOperand('+')
    fixture.detectChanges();
    expect(inputElement?.value).toBe('17+')
  })

  it('should check functionality of operation()', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement
    const inputElement = compiled.querySelector('input')
    app.num1 = 17
    app.num2 = 5
    app.operand = '+'
    app.operation()
    fixture.detectChanges();
    expect(inputElement?.value).toBe('22')
  })

  it('should check functinoality of calculations()', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculate(3, 5, '+')).toEqual(8)
    expect(app.calculate(3, 5, '-')).toEqual(-2)
    expect(app.calculate(3, 5, '*')).toEqual(15)
    expect(app.calculate(10, 5, '/')).toEqual(2)
    expect(app.calculate(10, 0,'/')).toEqual('you are unable to divide by zero')
    expect(app.calculate(10, 5, '^')).toEqual('User did not enter valid values')
  })

  it('should check functionality of clear()', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement
    const inputElement = compiled.querySelector('input')
    app.clear()
    fixture.detectChanges();
    expect(inputElement?.value).toBe('')
  })
});