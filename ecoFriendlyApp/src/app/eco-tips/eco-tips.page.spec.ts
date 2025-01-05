import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcoTipsPage } from './eco-tips.page';

describe('EcoTipsPage', () => {
  let component: EcoTipsPage;
  let fixture: ComponentFixture<EcoTipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
