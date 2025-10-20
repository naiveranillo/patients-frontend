import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from '@pages/patient-list/patient-list.component';
import { CreateEditPatientComponent } from '@pages/create-edit-patient/create-edit-patient.component';
import { PatientDetailsComponent } from '@pages/patient-details/patient-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/list',
    pathMatch: 'full'
  },
  {
    title: 'Lista de Pacientes',
    path: 'app/list',
    component: PatientListComponent,
  },
  {
    title: 'Crear Paciente',
    path: 'app/create',
    component: CreateEditPatientComponent
  },
  {
    title: 'Editar Paciente',
    path: 'app/edit/:id',
    component: CreateEditPatientComponent
  },
  {
    title: 'Detalles del Paciente',
    path: 'app/details/:id',
    component: PatientDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
