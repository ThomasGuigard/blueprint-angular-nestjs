import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDepenseModalPage } from './ajout-depense-modal.page';

describe('AjoutDepenseModalPageComponent', () => {
  let component: AjoutDepenseModalPage;
  let fixture: ComponentFixture<AjoutDepenseModalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDepenseModalPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDepenseModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
