import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainCashierInterfacePage } from './main-cashier-interface.page';

describe('MainCashierInterfacePage', () => {
  let component: MainCashierInterfacePage;
  let fixture: ComponentFixture<MainCashierInterfacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainCashierInterfacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
