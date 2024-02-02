import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSignupPage } from './customer-signup.page';

describe('CustomerSignupPage', () => {
  let component: CustomerSignupPage;
  let fixture: ComponentFixture<CustomerSignupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
