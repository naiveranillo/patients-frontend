# PatientsFrontend

Frontend en Angular 16 para la gestión de pacientes, con vistas para crear, editar, ver detalles y listar pacientes con filtros y paginación.

---

## Requisitos

- Node.js 18.0.0
- Angular 16.2.16
- PrimeNG 16.4.4

**1. Clonar el repositorio**
  - git clone https://github.com/naiveranillo/patients-frontend.git

**2. Instalar dependecias**
  - npm install


**3. Ejecutar la aplicación**
  - ng serve

Revisar que la URL del backend esté correctamente configurada en los servicios.

---

**Estructura**
- pages/: Vistas principales (lista, formulario, detalle).
- services/: Servicios por recurso con HttpClient.
- providers/: Proveedores globales como interceptores.
- interfaces/: Definición de tipos y modelos.
- utils/: Funciones y utilidades compartidas.

**Funcionalidades**
- Listado de pacientes con filtros y paginación.
- Formularios reactivos para crear y editar pacientes, con validaciones desde el backend y frontend.
- Vista de detalle de pacientes.
- Manejo global de errores usando un interceptor y ngx-toastr.
- Uso de componentes y funcionalidades de PrimeNG para la UI.
