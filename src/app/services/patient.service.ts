import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { CreatePatient } from '@interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createPatient(patientData: CreatePatient) {
    const url = `${this.API_URL}/api/v1/patients`;

    return this.http.post(url, patientData);
  }

  updatePartial(patientId: number, rowVersion: string, changes: any[]) {
    const url = `${this.API_URL}/api/v1/patients/${patientId}?rowVersion=${rowVersion}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });

    return this.http.patch(url, changes, { headers: headers });
  }

  getPatients(page: number, pageSize: number, name: string, documentNumber: any) {
    documentNumber = (documentNumber === undefined || documentNumber === null) ? '' : documentNumber;
    const url = `${this.API_URL}/api/v1/patients?Name=${name}&DocumentNumber=${documentNumber}&Page=${page}&PageSize=${pageSize}`;

    return this.http.get(url);
  }

  getPatientById(patientId: number) {
    const url = `${this.API_URL}/api/v1/patients/${patientId}`;

    return this.http.get(url);
  }

  deletePatient(patientId: number, rowVersion: string) {
    const headers = new HttpHeaders({
      'RowVersion': rowVersion
    });

    const url = `${this.API_URL}/api/v1/patients/${patientId}`;

    return this.http.delete(url, { headers: headers });
  }
}
