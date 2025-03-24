import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapsComponent } from './formaps.component';

describe('FormapsComponent', () => {
  let component: FormapsComponent;
  let fixture: ComponentFixture<FormapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
