import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashierLoginPage } from './cashier-login.page';

describe('CashierLoginPage', () => {
  let component: CashierLoginPage;
  let fixture: ComponentFixture<CashierLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CashierLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
