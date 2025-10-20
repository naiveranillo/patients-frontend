import { Component, OnInit } from '@angular/core';
import { ListPatient } from '@interfaces/patient.interface';
import { PatientService } from '@services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [ConfirmationService]
})
export class PatientListComponent implements OnInit {
  patients!: ListPatient[];

  page: number = 0;
  pageSize: number = 5;
  total: number = 10;
  name: string = '';
  documentNumber!: number;
  loadingButton: boolean = false;
  loadingTable: boolean = false;

  constructor(
    private patientService: PatientService,
    private confirmationService: ConfirmationService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(){
    this.getPatients(false, true);
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;

    this.getPatients(true);
  }

  confirm(event: Event, patient: ListPatient) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de eliminar este paciente?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePatient(patient.patientId, patient.rowVersion);
      },
      reject: () => {}
    });
  }

  deletePatient(patientId: number, rowVersion: string){
    this.patientService.deletePatient(patientId, rowVersion)
    .subscribe({
        next:() =>{
          this.toastr.success('Paciente eliminado correctamente', 'Éxito');
          this.getPatients();
        },
        error:(error) =>{
          console.error(error);
          this.toastr.error('Error al eliminar el paciente', 'Error');
        }
    });
  }

  getPatients(paginator: boolean = false, firstLoad: boolean = false){
    if(this.name.trim() === '' && (this.documentNumber === null || this.documentNumber === undefined) && !paginator){
      this.page = 0;
      this.pageSize = 5;
    }

    if(!paginator && !firstLoad){
      this.loadingButton = true;
    }else{
      this.loadingTable = true;
    }

    this.patientService.getPatients((this.page + 1), this.pageSize, this.name, this.documentNumber)
    .subscribe({
        next:(data: any) =>{
          this.patients = data.response.items as ListPatient[];
          this.page = (data.response.page - 1);
          this.pageSize = data.response.pageSize;
          this.total = data.response.total;
          this.loadingButton = false;
          this.loadingTable = false;
        },
        error:(error) =>{
          this.loadingButton = false;
          this.loadingTable = false;
          console.error(error);
        }
    });
  }
}
