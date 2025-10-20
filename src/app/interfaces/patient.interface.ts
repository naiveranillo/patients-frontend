export interface ListPatient{
  patientId: number
  documentType: string
  documentNumber: string
  firstName: string
  lastName: string
  birthDate: string
  phoneNumber: string
  email: string
  createdAt: string
  rowVersion: string
}

export interface CreatePatient{
  documentType: string
  documentNumber: any
  firstName: string
  lastName: string
  birthDate: string
  phoneNumber: string | null
  email: string | null
}