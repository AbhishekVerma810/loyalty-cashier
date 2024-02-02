import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndTransactionePage } from './end-transactione.page';

describe('EndTransactionePage', () => {
  let component: EndTransactionePage;
  let fixture: ComponentFixture<EndTransactionePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EndTransactionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
