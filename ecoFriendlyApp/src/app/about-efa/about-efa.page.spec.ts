import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutEFAPage } from './about-efa.page';

describe('AboutEFAPage', () => {
  let component: AboutEFAPage;
  let fixture: ComponentFixture<AboutEFAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEFAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
