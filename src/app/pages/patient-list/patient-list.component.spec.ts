import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientListComponent } from './patient-list.component';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener pageSize inicial igual a 5', () => {
    expect(component.pageSize).toBe(5);
  });

  it('debería actualizar page y pageSize al llamar onPageChange', () => {
    const event = { page: 2, rows: 10 };
    component.onPageChange(event);
    expect(component.page).toBe(2);
    expect(component.pageSize).toBe(10);
  });
});