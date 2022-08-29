import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'CalculatorApp';
  expression: string = '';
  result: string = '';
  allClear() {
    this.expression = '';
  }
  clear() {
    if (this.expression != '') {
      this.expression = this.expression.toString().substring(0, this.expression.length - 1);
    }
  }
  numPress(num: any) {
    if (num == '.') {
      if (this.expression != '') {
        const lastNum = this.getLastOperand();
        if (lastNum.lastIndexOf('.') >= 0)
          return;
      }
    }
    if (num == '0') {
      if (this.expression == '') {
        return;
      }
      const prev = this.expression[this.expression.length - 1];
      if (prev === '/' || prev === '*' || prev === '-' || prev === '+') {
        return;
      }
    }
    this.expression += num;
    this.calcAnswer();
  }
  getLastOperand() {
    let position: number;
    position = this.expression.toString().lastIndexOf('+');
    if (this.expression.toString().lastIndexOf('-') > position)
      position = this.expression.toString().lastIndexOf('-');
    if (this.expression.toString().lastIndexOf('*') > position)
      position = this.expression.toString().lastIndexOf('*');
    if (this.expression.toString().lastIndexOf('/') > position)
      position = this.expression.toString().lastIndexOf('/');
    return this.expression.substring(position + 1);
  }
  operPress(oper: any) {
    const last = this.expression[this.expression.length - 1];
    if (last === '/' || last === '*' || last === '-' || last === '+') {
      return;
    }
    this.expression += oper;
    this.calcAnswer();
  }
  calcAnswer() {
    let formula = this.expression;
    let last = formula[formula.length - 1];
    if (last === '.') {
      formula = formula.substring(0, formula.length - 1);
    }
    last = formula[formula.length - 1];
    if (last === '/' || last === '*' || last === '-' || last === '+' || last === '.') {
      formula = formula.substring(0, formula.length - 1);
    }
    this.result = eval(formula);
  }
  calculateExpression() {
    this.calcAnswer();
    this.expression = this.result;
    if (this.expression == '0') {
      this.expression = '';
    }
  }
}
