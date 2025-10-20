import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DateFormatService } from '@providers/date-format.service';
import { PatientService } from '@services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent {
  listAppointments = [
    {
      nombreMedico: 'Dra. Gómez',
      nombrePaciente: 'Juan Pérez',
      fechaHora: '2025-10-20T10:30:00',
      consultorio: 'Consultorio 3 - Medicina General',
      estado: 'Pendiente',
    },
    {
      nombreMedico: 'Dr. Salazar',
      nombrePaciente: 'María Ruiz',
      fechaHora: '2025-10-21T15:00:00',
      consultorio: 'Consultorio 1 - Cardiología',
      estado: 'Completada',
    },
    {
      nombreMedico: 'Dra. Torres',
      nombrePaciente: 'Carlos Díaz',
      fechaHora: '2025-10-22T09:00:00',
      consultorio: 'Consultorio 5 - Pediatría',
      estado: 'Cancelada',
    },
    {
      nombreMedico: 'Dr. Ramírez',
      nombrePaciente: 'Andrea Castaño',
      fechaHora: '2025-10-25T09:45:00',
      consultorio: 'Consultorio 6 - Piso 4',
      estado: 'Pendiente',
    },
    {
      nombreMedico: 'Dra. Herrera',
      nombrePaciente: 'Luis Morales',
      fechaHora: '2025-10-26T14:00:00',
      consultorio: 'Consultorio 2 - Piso 1',
      estado: 'Completada',
    },
    {
      nombreMedico: 'Dr. Castro',
      nombrePaciente: 'Valentina Rojas',
      fechaHora: '2025-10-27T16:30:00',
      consultorio: 'Consultorio 7 - Piso 4',
      estado: 'Cancelada',
    },
  ];

  patientForm = this._formBuilder.group({
    documentType: [''],
    documentNumber: [''],
    firstName: [''],
    lastName: [''],
    birthDate: [''],
    phoneNumber:[''],
    email: [''],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private patientService: PatientService,
    private dateFormat: DateFormatService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      id ? this.getPatientById(id) : null;
    });
  }

  getPatientById(id: any) {
    this.patientService.getPatientById(id).subscribe({
      next: (data: any) => {
        const patientData = data.response;

        this.patientForm.patchValue({
          documentType: patientData.documentType,
          documentNumber: patientData.documentNumber,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          birthDate: this.dateFormat.format(new Date(patientData.birthDate)),
          phoneNumber:
            patientData.phoneNumber == null ||
            patientData.phoneNumber === 'null'
              ? null
              : patientData.phoneNumber,
          email: patientData.email,
        });
      },
      error: (error) => {
        this.toastr.error(
          'Error al obtener los datos del paciente',
          error.message
        );
      },
    });
  }
}
