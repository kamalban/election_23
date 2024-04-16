import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifynumberComponent } from './verifynumber.component';

describe('VerifynumberComponent', () => {
  let component: VerifynumberComponent;
  let fixture: ComponentFixture<VerifynumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifynumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifynumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
