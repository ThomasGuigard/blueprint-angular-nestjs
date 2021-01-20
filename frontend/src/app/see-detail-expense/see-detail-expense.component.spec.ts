import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDetailExpenseComponent } from './see-detail-expense.component';

describe('SeeDetailExpenseComponent', () => {
  let component: SeeDetailExpenseComponent;
  let fixture: ComponentFixture<SeeDetailExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDetailExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeDetailExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
