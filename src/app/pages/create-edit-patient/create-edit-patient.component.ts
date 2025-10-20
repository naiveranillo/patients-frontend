import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CreatePatient } from '@interfaces/patient.interface';
import { DateFormatService } from '@providers/date-format.service';
import { PatientService } from '@services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-edit-patient',
  templateUrl: './create-edit-patient.component.html',
  styleUrls: ['./create-edit-patient.component.scss']
})
export class CreateEditPatientComponent implements OnInit {

  patientId: any = null;
  rowVersion: string = '';
  loadingButton: boolean = false;
  disabledButton: boolean = true;

  documentTypes: any[] = [
    { name: 'Cédula de Ciudadanía', code: 'CC' },
    { name: 'Cédula Extranjera', code: 'CE' },
    { name: 'Tarjeta de Identidad', code: 'TI' },
    { name: 'Registro Civil', code: 'RC' },
    { name: 'Pasaporte', code: 'PP' }
  ];

  errors: Record<string, string[]> = {};

  patientForm = this._formBuilder.group({
    documentType: [null as string | null, Validators.required],
    documentNumber: [null as string | null, Validators.required],
    firstName: [null as string | null, Validators.required],
    lastName: [null as string | null, Validators.required],
    birthDate: [null as string | null | Date, Validators.required],
    phoneNumber: [null as string | null],
    email: [null as string | null, [Validators.email]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private patientService: PatientService,
    private dateFormat: DateFormatService
  ) { }
  
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.patientId = id;

      id ?  this.getPatientById(): null;
    });

    this.patientForm.valueChanges.subscribe(() => {
      this.disabledButton = !this.patientForm.valid;
    });
  }

  saveForm(){
    this.errors = {};

    if (this.patientForm.valid) {
      if(this.patientId){
        const changes = this.getChangedFields();

        if (changes.length > 0) {
          this.loadingButton = true;
          this.updatePatient(changes);
        }
      }else{
        this.loadingButton = true;
        this.createPatient();
      }
    } else {
      Object.values(this.patientForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.toastr.warning('Digite los campos', 'Advertencia');
    }
  }

  updatePatient(changes: any[]){
    this.patientService.updatePartial(this.patientId, this.rowVersion, changes)
    .subscribe({
      next:(data: any) =>{
        this.toastr.success('Paciente actualizado correctamente', 'Éxito');
        this.loadingButton = false;
        this.router.navigate(['app/list']);
      },
      error:(error) =>{
        if (error.error.errors) {
          this.errors = error.error.errors;
        }

        this.loadingButton = false;
      }
    });
  }

  createPatient(){
    let patientInformation = this.patientForm.value as CreatePatient;

    patientInformation.birthDate = this.dateFormat.format(patientInformation.birthDate)!;
    patientInformation.documentNumber = String(patientInformation.documentNumber);
    patientInformation.phoneNumber = String(patientInformation.phoneNumber) || null;
    patientInformation.email = patientInformation.email || null;

    this.patientService.createPatient(patientInformation)
    .subscribe({
      next:(data: any) =>{
        this.toastr.success('Paciente creado correctamente', 'Éxito');
        this.loadingButton = false;
        this.router.navigate(['app/list']);
      },
      error:(error) =>{
        if (error.error.errors) {
          this.errors = error.error.errors;
        }
        
        this.loadingButton = false;
      }
    });
  }

  getPatientById(){
    this.patientService.getPatientById(this.patientId)
    .subscribe({
      next:(data: any) =>{
        const patientData = data.response;
        this.rowVersion = patientData.rowVersion;

        this.patientForm.patchValue({
          documentType: patientData.documentType,
          documentNumber: patientData.documentNumber,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          birthDate: new Date(patientData.birthDate),
          phoneNumber: patientData.phoneNumber == null || patientData.phoneNumber === 'null' ? null : patientData.phoneNumber,
          email: patientData.email
        });

        this.disabledButton = true;
      },
      error:(error) =>{
        this.toastr.error('Error al obtener los datos del paciente', error.message);
      }
    });
  }

  getChangedFields(): any[] {
    const changedFields: any[] = [];

    Object.keys(this.patientForm.controls).forEach(key => {
      const control = this.patientForm.get(key);

      if (control && control.dirty) {
        changedFields.push({
          op: 'replace',
          path: `/${key}`,
          value: control.value
        });
      }
    });

    return changedFields;
  }
}
