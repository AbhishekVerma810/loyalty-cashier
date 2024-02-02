import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionSuccessfulPage } from './connection-successful.page';

describe('ConnectionSuccessfulPage', () => {
  let component: ConnectionSuccessfulPage;
  let fixture: ComponentFixture<ConnectionSuccessfulPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConnectionSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
