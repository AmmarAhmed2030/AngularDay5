import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentProductsComponent } from './parent-products.component';

describe('ParentProductsComponent', () => {
  let component: ParentProductsComponent;
  let fixture: ComponentFixture<ParentProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
