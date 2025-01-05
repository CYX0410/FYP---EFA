import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcoProductPage } from './eco-product.page';

describe('EcoProductPage', () => {
  let component: EcoProductPage;
  let fixture: ComponentFixture<EcoProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
