# Sistema de Registro y Control de Accesos

**Documentación Técnica, Arquitectónica y de Usuario**

| Campo | Valor |
|---|---|
| Proyecto | Sistema de Registro y Control de Accesos |
| Contexto | Servicio Social · Materia de Diseño de Sistemas de Información |
| Repositorio | `curso-laravel` (rama `main`) |
| Versión del documento | 1.0 — Octubre 2026 |
| Stack principal | Laravel 13 (PHP 8.4) · Inertia.js 3 · React 19 · Tailwind CSS 4 · PostgreSQL |

---

## Convención de estado de implementación

Este documento describe el **diseño completo** del sistema. Ya que el proyecto se encuentra en desarrollo activo, cada módulo y funcionalidad se marca con su estado real en el repositorio:

| Marca | Significado |
|---|---|
| ✅ **Implementado** | Existe en el código, cuenta con rutas, vistas y/o pruebas funcionales. |
| 🟡 **Parcial** | Existe la base (p. ej. columna en BD o dependencia instalada), pero falta la lógica que la utiliza. |
| 🔲 **Planeado** | Forma parte del diseño, pero aún no tiene implementación. |

### Tabla de estado general

| Componente | Estado | Evidencia en el repositorio |
|---|---|---|
| CRUD de Departamentos | ✅ | `Departmentscontroller`, `DepartmentService`, `Pages/Departments/*`, `DepartmentCrudTest` |
| CRUD de Visitantes | ✅ | `VisitorController`, `VisitorService`, `Pages/Visitors/*`, `VisitorsCrudTest` |
| CRUD de Visitas (gafete, entrada, salida, estado) | ✅ | `VisitController`, `VisitService`, `Pages/Visits/*`, `VisitsCrudTest` |
| Capa de Servicios y FormRequests | ✅ | `app/service/*`, `app/Http/Requests/*` |
| SPA con Inertia.js + React | ✅ | `resources/js/app.jsx`, `HandleInertiaRequests` |
| Contenedor Docker y despliegue en Render | ✅ | `Dockerfile`, `render.yaml` |
| Atributo `role` en usuarios | 🟡 | Columna `enum` en migración de `users`; aún no se evalúa en ninguna ruta |
| Autenticación (inicio de sesión) | 🔲 | Sin rutas de login ni middleware `auth` aplicado |
| Middleware RBAC por rol | 🔲 | Las FormRequests devuelven `authorize(): true` |
| CRUD de Usuarios | 🔲 | `UserController` existe como plantilla vacía, sin rutas |
| Bitácora vehicular (`vehicles`) | 🔲 | Sin migración, modelo ni vistas |
| Acción rápida "Marcar Salida" | 🔲 | La hora de salida se captura manualmente en el formulario de edición |
| Modal Wizard de 4 pasos | 🔲 | El registro de visitas usa actualmente un formulario de una sola página |
| Notificaciones toast con `sonner` | ✅ | `Components/Feedback/FlashToaster.jsx` |
| Iconografía con `lucide-react` | ✅ | Navegación, encabezados de tabla, KPIs, botones y campos |
| Sistema de diseño "Cobalt Flow" | ✅ | Tokens `cobalt-50…900`, `canvas` e `ink` en `resources/css/app.css` |

---

# PARTE 1

## 1. Resumen Ejecutivo y Alcance del Sistema

### 1.1 Propósito general

El **Sistema de Registro y Control de Accesos** es una aplicación web *full-stack* que digitaliza el registro, seguimiento y auditoría del flujo de **personas** y **vehículos** que ingresan a un edificio institucional. Sustituye las bitácoras en papel por un registro centralizado, consultable y trazable, en el que cada movimiento queda asociado al usuario operador que lo registró.

### 1.2 Problemática que resuelve

| Problema en el proceso manual | Consecuencia | Solución del sistema |
|---|---|---|
| Bitácoras en papel, ilegibles o incompletas | Pérdida de información y nula trazabilidad | Registro estructurado con validación obligatoria de campos |
| Desconocimiento de quién permanece dentro del edificio | Riesgo de seguridad y en protocolos de evacuación | Estado de visita (`dentro`, `completado`, `cancelado`) y hora de salida |
| Control informal de gafetes | Gafetes extraviados o no devueltos | Número de gafete ligado a cada visita |
| Datos de visitantes recurrentes recapturados en cada ingreso | Tiempo de atención elevado en recepción | Catálogo único de visitantes, identificados por número de identificación |
| Ausencia de registro vehicular | Imposibilidad de auditar vehículos dentro del estacionamiento | Bitácora vehicular por placas, con horas de entrada/salida (🔲) |
| Cualquier persona puede modificar los registros | Información poco confiable | Control de Acceso Basado en Roles — RBAC (🔲) |

### 1.3 Alcance funcional

El sistema se organiza en cinco módulos funcionales operados por tres roles:

| Módulo | Descripción | Rol principal | Estado |
|---|---|---|---|
| Departamentos | Directorio de áreas del edificio y su ubicación (planta/piso) | Administrador | ✅ |
| Visitantes | Catálogo de personas externas (nombre, identificación, teléfono) | Recepción | ✅ |
| Visitas | Registro de cada ingreso: destino, motivo, gafete, entrada, salida y estado | Recepción | ✅ |
| Vehículos | Bitácora de vehículos: placas, marca, color, tipo, entrada y salida | Guardia | 🔲 |
| Usuarios | Alta y administración de operadores y sus roles | Administrador | 🔲 |

**Fuera de alcance (versión actual):** lectura biométrica, lectores de código QR/RFID, integración con cámaras de reconocimiento de placas y envío de notificaciones por correo al anfitrión.

### 1.4 Beneficios operativos

- **Trazabilidad:** cada visita registra al usuario responsable (`visits.user_id`), lo que permite auditorías posteriores.
- **Reducción del tiempo de atención:** un visitante recurrente se selecciona del catálogo en lugar de recapturarse.
- **Integridad de datos:** las validaciones en servidor (FormRequests) impiden departamentos duplicados, identificaciones duplicadas y horas de salida anteriores a la entrada.
- **Disponibilidad:** la aplicación se despliega en la nube (Render) y se accede desde cualquier navegador, sin instalación en los equipos de caseta o recepción.
- **Mantenibilidad:** la separación en capas (Controlador → Servicio → Modelo) y las pruebas automatizadas facilitan la evolución del sistema.

---

## 2. Arquitectura de Software

### 2.1 Visión general

El sistema implementa un patrón **MVC extendido con Capa de Servicios**, en el que la "V" (Vista) ya no son plantillas Blade renderizadas en servidor, sino **componentes React** entregados mediante **Inertia.js**. Inertia actúa como "pegamento" entre Laravel y React: permite construir una SPA (*Single Page Application*) sin necesidad de diseñar una API REST independiente.

| Capa | Ubicación | Responsabilidad |
|---|---|---|
| **Cliente (Vista)** | `resources/js/Pages/`, `Layouts/`, `Components/` | Interfaz de usuario en React 19; navegación sin recarga mediante `<Link>` y formularios con `useForm` de `@inertiajs/react` |
| **Enrutamiento** | `routes/web.php` | Mapea URL + verbo HTTP a una acción del controlador (rutas con nombre, p. ej. `visits.index`) |
| **Middleware** | `app/Http/Middleware/`, `bootstrap/app.php` | Pila `web` (sesión, CSRF, cookies) + `HandleInertiaRequests` (comparte *flash messages*). Autenticación y RBAC: 🔲 |
| **Validación** | `app/Http/Requests/{Módulo}/` | FormRequests `Store*Request` / `Update*Request`: reglas, mensajes personalizados y (a futuro) autorización por rol |
| **Controlador** | `app/Http/Controllers/` | Orquesta la petición: recibe datos validados, invoca al servicio y devuelve `Inertia::render()` o una redirección |
| **Servicio** | `app/service/{módulo}/` | Lógica de negocio y acceso a datos encapsulado (`getAll`, `create`, `find`, `update`, `delete`) |
| **Modelo** | `app/Models/` | Entidades Eloquent: tabla, atributos asignables (`$fillable`), *casts*, relaciones y mutadores/accesores |
| **Persistencia** | `database/migrations/` | SQLite (local y pruebas) · PostgreSQL (producción) |

### 2.2 Justificación de las decisiones arquitectónicas

1. **Capa de Servicios (`app/service/`).** Evita controladores "obesos". El controlador se limita a coordinar y el servicio concentra la lógica reutilizable. Los servicios se inyectan por constructor mediante el contenedor de dependencias de Laravel:

   ```php
   class VisitController extends Controller
   {
       public function __construct(private VisitService $visitService) {}

       public function store(StoreVisitRequest $request)
       {
           $this->visitService->create($request->validated());

           return redirect()
               ->route('visits.index')
               ->with('message', 'Visita creada correctamente.');
       }
   }
   ```

2. **Validación desacoplada (FormRequests).** Laravel ejecuta la FormRequest **antes** de entrar al método del controlador; si la validación falla, redirige automáticamente con los errores, que Inertia expone en `form.errors` del componente React. Solo los campos validados (`$request->validated()`) llegan al servicio, lo que previene la asignación masiva de atributos no permitidos.

3. **Inertia.js en lugar de API REST.** El controlador devuelve `Inertia::render('Visits/Index', ['visits' => ...])`. En la primera visita se entrega el HTML base (`resources/views/app.blade.php`) con los *props* serializados; en navegaciones posteriores el cliente envía la cabecera `X-Inertia` y recibe únicamente un JSON con el componente y sus *props*. Esto conserva el enrutamiento, la sesión y la protección CSRF de Laravel, con la experiencia fluida de una SPA.

4. **Carga eager de relaciones.** `VisitService::getAll()` utiliza `with(['visitor', 'department', 'user'])` para evitar el problema de consultas N+1 al listar visitas.

5. **Mutadores y accesores.** Los modelos normalizan datos: `departments.name` se almacena en minúsculas y se muestra con la primera letra en mayúscula (`ucfirst`); `visitors.full_name` se almacena en minúsculas y se muestra en formato título (`ucwords`).

### 2.3 Diagrama de arquitectura

```mermaid
flowchart TD
    subgraph CLIENTE["Cliente · Navegador"]
        A["Componentes React 19<br/>Pages / Layouts / Components"]
        B["@inertiajs/react<br/>Link · useForm · router"]
        A --> B
    end

    subgraph LARAVEL["Servidor · Laravel 13 / PHP 8.4"]
        C["routes/web.php<br/>Rutas con nombre"]
        D["Pila de Middleware<br/>web: sesión · CSRF · cookies<br/>HandleInertiaRequests: flash"]
        D2["auth + role:admin|recepcion|guardia<br/>(🔲 Planeado)"]
        E["FormRequests<br/>Store*Request · Update*Request"]
        F["Controladores<br/>Departments · Visitor · Visit"]
        G["Capa de Servicios<br/>DepartmentService · VisitorService · VisitService"]
        H["Modelos Eloquent<br/>departments · visitors · visits · User"]
    end

    subgraph DATOS["Persistencia"]
        I[("PostgreSQL<br/>Producción · Render")]
        J[("SQLite<br/>Local · Testing")]
    end

    B -- "HTTP + cabecera X-Inertia" --> C
    C --> D
    D --> D2
    D2 --> F
    F -- "inyección de dependencias" --> E
    E -- "datos validados" --> F
    F --> G
    G --> H
    H -- "PDO / Query Builder" --> I
    H -.-> J
    F -- "Inertia::render(componente, props)<br/>o redirect()->with('message')" --> B

    classDef planned stroke-dasharray: 5 5
    class D2 planned
```

### 2.4 Ciclo de vida de una petición (ejemplo: registrar una visita)

```mermaid
sequenceDiagram
    autonumber
    actor R as Recepción
    participant UI as Visits/Form.jsx
    participant RT as routes/web.php
    participant FR as StoreVisitRequest
    participant VC as VisitController
    participant VS as VisitService
    participant M as Modelo visits
    participant DB as PostgreSQL

    R->>UI: Captura visitante, departamento, motivo, gafete
    UI->>RT: POST /visitas (X-Inertia, token CSRF)
    RT->>FR: Resuelve visits.store
    alt Validación fallida
        FR-->>UI: 302 + errores en sesión → form.errors
    else Validación correcta
        FR->>VC: store(request)
        VC->>VS: create(request->validated())
        VS->>M: visits::create(data)
        M->>DB: INSERT INTO visits ...
        DB-->>M: id generado
        VC-->>UI: redirect visits.index + flash "Visita creada correctamente."
        UI-->>R: Lista actualizada + mensaje de confirmación
    end
```

### 2.5 Capa de presentación y sistema de diseño

| Elemento | Tecnología | Estado |
|---|---|---|
| Compilación y *Hot Module Replacement* | Vite 8 + `laravel-vite-plugin` + `@vitejs/plugin-react` | ✅ |
| Estilos | Tailwind CSS 4 (`@tailwindcss/vite`) | ✅ |
| Layout con barra lateral de navegación | `Layouts/AppLayout.jsx` | ✅ |
| Notificaciones toast | `sonner` vía `Components/Feedback/FlashToaster.jsx` (lee el prop compartido `flash.message`) | ✅ |
| Iconografía | `lucide-react` | ✅ |
| Animaciones de interfaz | Transición CSS `animate-page-in` (respeta `prefers-reduced-motion`); `framer-motion` queda instalado sin uso | ✅ |
| Paleta "Cobalt Flow" | Primario `#3d52d5`, fondo `#eaf0f9`, colores semánticos esmeralda / slate / ámbar / rosa | ✅ |
| Componentes reutilizables | `Components/UI/` (Button, Badge, Card, Table, Pagination, StatCard…) y `Components/Forms/` | ✅ |
| Modal Wizard de registro en 4 pasos | Componente React | 🔲 (ver Sección 4) |

### 2.6 Observaciones técnicas detectadas

Durante el levantamiento de esta documentación se identificaron los siguientes puntos de mejora:

| # | Observación | Recomendación |
|---|---|---|
| 1 | `Departmentscontroller::index()` consulta el modelo directamente (`departments::paginate(10)`) en lugar de usar el servicio. | Agregar `getAll()` a `DepartmentService`, igual que en los otros servicios. |
| 2 | La ruta `departments.show` apunta a un método vacío. | Implementar la vista de detalle o retirar la ruta. |
| 3 | La unicidad de `departments.name` y `visitors.identification_number` solo se valida en las FormRequests. | Agregar índices `unique()` en las migraciones para garantizar la integridad a nivel de BD. |
| 4 | El modelo `User` no incluye `role` en `#[Fillable]`. | Agregarlo cuando se implemente el CRUD de usuarios. |
| 5 | El campo `user_id` de la visita lo elige el operador en un `<select>`. | Asignarlo automáticamente con `auth()->id()` una vez exista autenticación. |

---

## 3. Diseño de Base de Datos (Modelo Entidad-Relación)

### 3.1 Diagrama Entidad-Relación

El modelo incluye las tablas de negocio. Las tablas de infraestructura del framework (`sessions`, `password_reset_tokens`, `cache`, `jobs`) se omiten del diagrama.

```mermaid
erDiagram
    USERS ||--o{ VISITS : "registra"
    USERS ||--o{ VEHICLES : "registra"
    VISITORS ||--o{ VISITS : "realiza"
    DEPARTMENTS ||--o{ VISITS : "recibe"
    VISITORS |o--o{ VEHICLES : "conduce (opcional)"

    USERS {
        bigint id PK
        varchar name
        varchar email UK
        varchar password "hash bcrypt"
        enum role "admin | recepcion | guardia"
        timestamp created_at
        timestamp updated_at
    }

    DEPARTMENTS {
        bigint id PK
        varchar name "único (validación)"
        varchar building_floor
        timestamp created_at
        timestamp updated_at
    }

    VISITORS {
        bigint id PK
        varchar full_name
        varchar identification_number "único (validación)"
        varchar phone "nullable"
        timestamp created_at
        timestamp updated_at
    }

    VISITS {
        bigint id PK
        bigint visitor_id FK
        bigint department_id FK
        bigint user_id FK
        varchar reason
        varchar badge_number "nullable"
        timestamp entry_time
        timestamp exit_time "nullable"
        enum status "dentro | completado | cancelado"
        timestamp created_at
        timestamp updated_at
    }

    VEHICLES {
        bigint id PK "🔲 Planeado"
        bigint user_id FK
        bigint visitor_id FK "nullable"
        varchar plate_number
        varchar brand
        varchar color
        enum vehicle_type "sedan | camioneta | motocicleta | pickup | otro"
        varchar driver_name "nullable"
        timestamp entry_time
        timestamp exit_time "nullable"
        timestamp created_at
        timestamp updated_at
    }
```

**Cardinalidades:**

- Un **visitante** puede realizar **cero o muchas** visitas; cada visita pertenece a **exactamente un** visitante.
- Un **departamento** puede recibir **cero o muchas** visitas; cada visita tiene **un** departamento destino.
- Un **usuario** (operador) registra **cero o muchas** visitas y **cero o muchos** vehículos.
- Un **vehículo** puede asociarse **opcionalmente** a un visitante registrado (p. ej. un proveedor), o solo capturar el nombre del conductor.

### 3.2 Diccionario de datos

> **Notación:** PK = Llave primaria · FK = Llave foránea · UK = Único · NN = No nulo · AI = Autoincremental.
> Los tipos se expresan en su equivalente PostgreSQL; Laravel los traduce automáticamente en SQLite.

#### Tabla `users` — Operadores del sistema ✅

| Atributo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `BIGINT` | PK, AI, NN | Identificador del usuario |
| `name` | `VARCHAR(255)` | NN | Nombre completo del operador |
| `email` | `VARCHAR(255)` | NN, UK | Correo de acceso al sistema |
| `password` | `VARCHAR(255)` | NN | Contraseña cifrada (cast `hashed`, bcrypt) |
| `role` | `ENUM` / `VARCHAR` + `CHECK` | NN, default `'guardia'` | Rol RBAC: `admin`, `recepcion`, `guardia` |
| `created_at` | `TIMESTAMP` | Nullable | Fecha de creación |
| `updated_at` | `TIMESTAMP` | Nullable | Fecha de última modificación |

#### Tabla `departments` — Directorio de áreas ✅

| Atributo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `BIGINT` | PK, AI, NN | Identificador del departamento |
| `name` | `VARCHAR(255)` | NN; único por validación (`unique:departments,name`) | Nombre del área. Mutador: se guarda en minúsculas; accesor: se muestra con `ucfirst` |
| `building_floor` | `VARCHAR(255)` | NN | Ubicación física (p. ej. "Planta baja", "Piso 2") |
| `created_at` / `updated_at` | `TIMESTAMP` | Nullable | Marcas de tiempo |

#### Tabla `visitors` — Catálogo de visitantes ✅

| Atributo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `BIGINT` | PK, AI, NN | Identificador del visitante |
| `full_name` | `VARCHAR(255)` | NN | Nombre completo. Se guarda en minúsculas y se muestra con `ucwords` |
| `identification_number` | `VARCHAR(255)` | NN; único por validación | Número de la identificación presentada (INE, licencia, credencial) |
| `phone` | `VARCHAR(30)`* | Nullable | Teléfono de contacto (*longitud máxima validada en FormRequest) |
| `created_at` / `updated_at` | `TIMESTAMP` | Nullable | Marcas de tiempo |

#### Tabla `visits` — Registro de ingresos ✅

| Atributo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `BIGINT` | PK, AI, NN | Identificador de la visita |
| `visitor_id` | `BIGINT` | FK → `visitors.id`, NN, `ON DELETE CASCADE` | Persona que ingresa |
| `department_id` | `BIGINT` | FK → `departments.id`, NN, `ON DELETE CASCADE` | Departamento destino |
| `user_id` | `BIGINT` | FK → `users.id`, NN, `ON DELETE CASCADE` | Operador que registró la visita |
| `reason` | `VARCHAR(255)` | NN | Motivo de la visita |
| `badge_number` | `VARCHAR(255)` | Nullable | Número de gafete entregado |
| `entry_time` | `TIMESTAMP` | NN | Fecha y hora de entrada |
| `exit_time` | `TIMESTAMP` | Nullable; validación `after_or_equal:entry_time` | Fecha y hora de salida; `NULL` mientras la persona permanece dentro |
| `status` | `ENUM` / `VARCHAR` + `CHECK` | NN, default `'dentro'` | Estado: `dentro`, `completado`, `cancelado` |
| `created_at` / `updated_at` | `TIMESTAMP` | Nullable | Marcas de tiempo |

#### Tabla `vehicles` — Bitácora vehicular 🔲 (diseño propuesto)

| Atributo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `BIGINT` | PK, AI, NN | Identificador del registro vehicular |
| `user_id` | `BIGINT` | FK → `users.id`, NN | Guardia que registró el ingreso |
| `visitor_id` | `BIGINT` | FK → `visitors.id`, Nullable, `ON DELETE SET NULL` | Visitante asociado (opcional) |
| `plate_number` | `VARCHAR(15)` | NN, indexado | Número de placas (normalizado a mayúsculas) |
| `brand` | `VARCHAR(100)` | NN | Marca del vehículo |
| `color` | `VARCHAR(50)` | NN | Color predominante |
| `vehicle_type` | `ENUM` | NN | `sedan`, `camioneta`, `motocicleta`, `pickup`, `otro` |
| `driver_name` | `VARCHAR(255)` | Nullable | Nombre del conductor si no es un visitante registrado |
| `entry_time` | `TIMESTAMP` | NN, default `now()` | Hora de entrada al edificio |
| `exit_time` | `TIMESTAMP` | Nullable, `>= entry_time` | Hora de salida |
| `created_at` / `updated_at` | `TIMESTAMP` | Nullable | Marcas de tiempo |

### 3.3 Reglas de integridad y de negocio

| Regla | Mecanismo | Estado |
|---|---|---|
| No pueden existir dos departamentos con el mismo nombre | `StoreDepartmentRequest` / `UpdateDepartmentRequest` (`Rule::unique()->ignore($id)`) | ✅ |
| No pueden existir dos visitantes con el mismo número de identificación | `StoreVisitorRequest` / `UpdateVisitorRequest` | ✅ |
| Una visita debe referenciar visitante, departamento y usuario existentes | Reglas `exists:` + llaves foráneas | ✅ |
| La salida no puede ser anterior a la entrada | Regla `after_or_equal:entry_time` | ✅ |
| Al eliminar un visitante o departamento se eliminan sus visitas | `ON DELETE CASCADE` | ✅ (ver nota) |
| El estado `status` solo admite valores definidos | `enum` en migración + `Rule::in([...])` | ✅ |
| Un vehículo no puede tener dos ingresos abiertos simultáneos con las mismas placas | Validación en `StoreVehicleRequest` (`exit_time IS NULL`) | 🔲 |

> **Nota de diseño:** el borrado en cascada facilita el mantenimiento, pero elimina historial de auditoría. Para un sistema de control de accesos se recomienda evaluar *Soft Deletes* (`deleted_at`) en `visitors` y `departments`, de modo que los registros históricos de visitas se conserven.

### 3.4 Datos de prueba (Factories y Seeders)

| Recurso | Archivo | Uso |
|---|---|---|
| Factories | `database/factories/{User,departments,visitors,visits}Factory.php` | Generan datos ficticios con Faker para pruebas y *seeding* |
| Seeder principal | `database/seeders/DatabaseSeeder.php` | Crea el usuario `guardia@registro.test` (rol `guardia`) e invoca los seeders de departamentos, visitantes y visitas |
| Seeders por módulo | `departmentseeder.php`, `visitorSeeder.php`, `visitSeeder.php` | Pueblan el catálogo inicial |

---

# PARTE 2

## 4. Especificación de Roles (RBAC) y Casos de Uso

### 4.1 Modelo de Control de Acceso Basado en Roles

Cada usuario tiene **exactamente un rol**, almacenado en la columna `users.role` (✅). El diseño establece que la autorización se aplique en dos niveles (🔲):

1. **Nivel de ruta:** un middleware `role` restringe grupos de rutas completos según el rol del usuario autenticado.
2. **Nivel de petición:** el método `authorize()` de cada FormRequest valida permisos finos (por ejemplo, que solo `admin` pueda eliminar registros).

| Rol | Clave en BD | Perfil del usuario | Módulo principal |
|---|---|---|---|
| Administrador | `admin` | Responsable del sistema o jefe de seguridad | Todos + métricas globales |
| Recepción | `recepcion` | Personal del mostrador de ingreso peatonal | Visitantes y Visitas |
| Guardia / Caseta | `guardia` | Personal de vigilancia en el acceso vehicular | Vehículos |

### 4.2 Matriz de permisos

> **C** = Crear · **R** = Consultar · **U** = Actualizar · **D** = Eliminar · ✔ = Permitido · ✖ = Denegado.
> La matriz representa el **diseño objetivo**; la columna "Estado" indica si el módulo ya existe. Hoy **todas** las rutas son públicas, sin restricción por rol.

| Módulo | Acción | Admin | Recepción | Guardia | Estado del módulo |
|---|---|:---:|:---:|:---:|:---:|
| **Panel / Métricas** | Ver métricas globales (visitas del día, personas dentro, vehículos dentro) | ✔ | ✖ | ✖ | 🔲 |
| **Usuarios** | C / R / U / D usuarios y asignar rol | ✔ | ✖ | ✖ | 🔲 |
| **Departamentos** | R — Consultar directorio | ✔ | ✔ | ✔ | ✅ |
| | C / U — Alta y edición | ✔ | ✖ | ✖ | ✅ |
| | D — Eliminar | ✔ | ✖ | ✖ | ✅ |
| **Visitantes** | C / R / U — Registrar y editar | ✔ | ✔ | ✖ | ✅ |
| | D — Eliminar | ✔ | ✖ | ✖ | ✅ |
| **Visitas** | C — Registrar entrada (Wizard) | ✔ | ✔ | ✖ | ✅ (Wizard 🔲) |
| | R — Consultar visitas y personas dentro | ✔ | ✔ | ✔ | ✅ |
| | U — Editar visita | ✔ | ✔ | ✖ | ✅ |
| | **Marcar Salida** | ✔ | ✔ | ✖ | 🔲 |
| | D — Eliminar | ✔ | ✖ | ✖ | ✅ |
| **Vehículos** | C — Registrar entrada vehicular | ✔ | ✖ | ✔ | 🔲 |
| | R — Consultar bitácora | ✔ | ✖ | ✔ | 🔲 |
| | U — Editar / Marcar salida vehicular | ✔ | ✖ | ✔ | 🔲 |
| | D — Eliminar | ✔ | ✖ | ✖ | 🔲 |

**Criterio de diseño:** se aplica el **principio de mínimo privilegio**. La eliminación de registros queda reservada al administrador para preservar la bitácora de auditoría; el guardia puede consultar las visitas para verificar si una persona tiene un ingreso autorizado, pero no modificarlas.

### 4.3 Propuesta de implementación del RBAC 🔲

**Middleware de rol** (`app/Http/Middleware/EnsureUserHasRole.php`):

```php
class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! $request->user() || ! in_array($request->user()->role, $roles, true)) {
            abort(403, 'No tienes permiso para acceder a este módulo.');
        }

        return $next($request);
    }
}
```

**Registro del alias** en `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias(['role' => \App\Http\Middleware\EnsureUserHasRole::class]);
})
```

**Agrupación de rutas** en `routes/web.php`:

```php
Route::middleware('auth')->group(function () {
    Route::middleware('role:admin')->group(function () {
        Route::resource('usuarios', UserController::class);
    });

    Route::middleware('role:admin,recepcion')->group(function () {
        Route::patch('/visitas/{id}/salida', [VisitController::class, 'markExit'])->name('visits.exit');
        // rutas de visitantes y visitas
    });

    Route::middleware('role:admin,guardia')->group(function () {
        // rutas de vehículos
    });
});
```

### 4.4 Diagrama de casos de uso

```mermaid
flowchart LR
    ADM(["👤 Administrador"])
    REC(["👤 Recepción"])
    GUA(["👤 Guardia"])

    subgraph SISTEMA["Sistema de Registro y Control de Accesos"]
        CU01(["CU-01 Iniciar sesión"])
        CU02(["CU-02 Gestionar usuarios y roles"])
        CU03(["CU-03 Gestionar departamentos"])
        CU04(["CU-04 Gestionar visitantes"])
        CU05(["CU-05 Registrar visita (Wizard)"])
        CU06(["CU-06 Marcar salida de visita"])
        CU07(["CU-07 Registrar entrada vehicular"])
        CU08(["CU-08 Registrar salida vehicular"])
        CU09(["CU-09 Consultar métricas globales"])
    end

    ADM --- CU01 & CU02 & CU03 & CU09
    ADM --- CU04 & CU05 & CU06 & CU07 & CU08
    REC --- CU01 & CU04 & CU05 & CU06
    GUA --- CU01 & CU07 & CU08

    CU05 -. "«include»" .-> CU04
```

### 4.5 Catálogo de casos de uso

| ID | Caso de uso | Actor(es) | Estado |
|---|---|---|---|
| CU-01 | Iniciar sesión | Todos | 🔲 |
| CU-02 | Gestionar usuarios y roles | Admin | 🔲 |
| CU-03 | Gestionar departamentos | Admin | ✅ (sin restricción de rol) |
| CU-04 | Gestionar visitantes | Admin, Recepción | ✅ (sin restricción de rol) |
| CU-05 | Registrar visita mediante Modal Wizard | Admin, Recepción | 🟡 (registro ✅, Wizard 🔲) |
| CU-06 | Marcar salida de visita | Admin, Recepción | 🟡 (salida manual ✅, botón rápido 🔲) |
| CU-07 | Registrar entrada vehicular | Admin, Guardia | 🔲 |
| CU-08 | Registrar salida vehicular | Admin, Guardia | 🔲 |
| CU-09 | Consultar métricas globales | Admin | 🔲 |

### 4.6 Especificación de casos de uso principales

#### CU-05 · Registrar visita mediante Modal Wizard

| Campo | Descripción |
|---|---|
| **Actor principal** | Recepción (también Administrador) |
| **Objetivo** | Registrar el ingreso de una persona en el menor número de pasos y sin errores de captura |
| **Precondiciones** | El operador ha iniciado sesión con rol `recepcion` o `admin`; existe al menos un departamento registrado |
| **Postcondiciones** | Se crea un registro en `visits` con `status = 'dentro'`, `entry_time = now()` y `user_id` del operador |
| **Estado** | 🟡 Hoy el registro se realiza en un formulario de una sola página (`Pages/Visits/Form.jsx`) |

**Flujo principal (diseño del Wizard de 4 pasos):**

| Paso | Pantalla | Acciones del operador | Validación |
|---|---|---|---|
| 1 | **Visitante** | Busca al visitante por nombre o identificación. Si no existe, lo da de alta en el mismo paso (*include* CU-04) | `full_name` y `identification_number` obligatorios; identificación única |
| 2 | **Destino** | Selecciona el departamento destino y captura el motivo de la visita | `department_id` existente; `reason` obligatorio (máx. 255) |
| 3 | **Gafete** | Captura o escanea el número de gafete entregado | `badge_number` opcional (máx. 255) |
| 4 | **Confirmación** | Revisa el resumen y confirma. El sistema asigna `entry_time = now()` y `user_id = auth()->id()` | Validación completa en `StoreVisitRequest` |

**Flujos alternos:**

- **FA-1 · Datos inválidos:** el servidor devuelve los errores; el Wizard regresa al paso donde se encuentra el campo con error y lo resalta.
- **FA-2 · Cancelación:** el operador cierra el modal; no se persiste ningún dato de la visita.
- **FA-3 · Visitante nuevo:** si en el paso 1 se crea un visitante, este queda guardado aunque la visita se cancele después.

```mermaid
stateDiagram-v2
    [*] --> Paso1_Visitante
    Paso1_Visitante --> Paso2_Destino : visitante seleccionado o creado
    Paso2_Destino --> Paso1_Visitante : Atrás
    Paso2_Destino --> Paso3_Gafete : departamento y motivo válidos
    Paso3_Gafete --> Paso2_Destino : Atrás
    Paso3_Gafete --> Paso4_Confirmacion : Siguiente
    Paso4_Confirmacion --> Paso3_Gafete : Atrás
    Paso4_Confirmacion --> Enviando : Confirmar
    Enviando --> Paso4_Confirmacion : errores de validación
    Enviando --> Registrada : 302 + mensaje flash
    Registrada --> [*] : toast "Visita registrada"
    Paso1_Visitante --> [*] : Cancelar
    Paso2_Destino --> [*] : Cancelar
    Paso3_Gafete --> [*] : Cancelar
    Paso4_Confirmacion --> [*] : Cancelar
```

#### CU-06 · Marcar salida de visita

| Campo | Descripción |
|---|---|
| **Actor principal** | Recepción (también Administrador) |
| **Objetivo** | Registrar la hora exacta de salida con un solo clic, sin capturar la fecha manualmente |
| **Precondiciones** | La visita existe y tiene `status = 'dentro'` y `exit_time = NULL` |
| **Postcondiciones** | `exit_time = now()` y `status = 'completado'`; el gafete queda disponible |
| **Estado** | 🟡 Hoy la salida se captura editando la visita (`datetime-local`); el botón de acción rápida está planeado |

**Flujo principal:**

1. El operador localiza la visita activa en el listado de visitas.
2. Presiona el botón **"Marcar Salida"**.
3. El cliente envía `PATCH /visitas/{id}/salida`.
4. El servicio actualiza el registro solo si la visita sigue abierta.
5. El sistema redirige al listado y muestra una notificación de confirmación.

**Flujo alterno FA-1 · Salida ya registrada:** si la visita ya tenía `exit_time`, no se modifica y se informa al operador.

**Propuesta de implementación (🔲):**

```php
// app/service/visits/VisitService.php
public function markExit(int $id): bool
{
    return visits::where('id', $id)
        ->whereNull('exit_time')
        ->update(['exit_time' => now(), 'status' => 'completado']) > 0;
}
```

```jsx
// Pages/Visits/Index.jsx
<button onClick={() => router.patch(`/visitas/${visit.id}/salida`)}>
    Marcar Salida
</button>
```

```mermaid
sequenceDiagram
    autonumber
    actor R as Recepción
    participant UI as Visits/Index.jsx
    participant MW as Middleware auth + role
    participant VC as VisitController
    participant VS as VisitService
    participant DB as PostgreSQL

    R->>UI: Clic en "Marcar Salida"
    UI->>MW: PATCH /visitas/{id}/salida
    MW->>VC: markExit(id)
    VC->>VS: markExit(id)
    VS->>DB: UPDATE visits SET exit_time = now(), status = 'completado' WHERE id = ? AND exit_time IS NULL
    alt Visita abierta
        DB-->>VS: 1 fila afectada
        VC-->>UI: redirect + flash "Salida registrada"
    else Salida ya registrada
        DB-->>VS: 0 filas afectadas
        VC-->>UI: redirect + flash "La visita ya tenía salida"
    end
    UI-->>R: Toast de confirmación y lista actualizada
```

#### CU-07 / CU-08 · Registrar entrada y salida vehicular 🔲

| Campo | Descripción |
|---|---|
| **Actor principal** | Guardia (también Administrador) |
| **Objetivo** | Llevar la bitácora de vehículos que ingresan y salen del edificio |
| **Precondiciones** | El guardia ha iniciado sesión |
| **Datos de entrada** | `plate_number`, `brand`, `color`, `vehicle_type`, `driver_name` o `visitor_id` (opcional) |
| **Postcondiciones (entrada)** | Registro en `vehicles` con `entry_time = now()`, `exit_time = NULL` y `user_id` del guardia |
| **Postcondiciones (salida)** | `exit_time = now()` mediante botón rápido, con el mismo mecanismo que CU-06 |
| **Regla de negocio** | No se permite registrar la entrada de unas placas que ya tienen un ingreso abierto |

#### CU-03 / CU-04 · Gestionar departamentos y visitantes ✅

CRUD completo implementado: listado paginado (10 registros), formulario de alta, edición, eliminación y mensajes de confirmación. Las validaciones de unicidad (`name` del departamento, `identification_number` del visitante) devuelven mensajes en español definidos en las FormRequests.

---

## 5. Infraestructura, DevOps y Guía de Despliegue

### 5.1 Entornos

| Entorno | Base de datos | Servidor web | Assets frontend | Configuración |
|---|---|---|---|---|
| **Local (WSL 2)** | SQLite (`database/database.sqlite`) | `php artisan serve` (puerto 8000) | Vite dev server con HMR | `.env` |
| **Testing** | SQLite en memoria (`:memory:`) | Kernel HTTP de Laravel | Omitidos (`@unless testing`) | `phpunit.xml` |
| **Producción (Render)** | PostgreSQL administrado | Apache 2 + PHP 8.4 en Docker | Compilados con `npm run build` | Variables de entorno de Render |

### 5.2 Guía de instalación local en WSL 2 (Ubuntu)

#### Requisitos previos

| Herramienta | Versión mínima | Verificación |
|---|---|---|
| PHP | 8.3 (requerido por `composer.json`); producción usa 8.4 | `php -v` |
| Extensiones PHP | `pdo_sqlite`, `sqlite3`, `mbstring`, `xml`, `curl`, `zip`, `bcmath` | `php -m` |
| Composer | 2.x | `composer -V` |
| Node.js (vía NVM) | 22 LTS (misma versión que la imagen Docker) | `node -v` |
| Git | 2.x | `git --version` |

> **Recomendación para WSL:** clona el proyecto dentro del sistema de archivos de Linux (por ejemplo `~/proyectos/`) y no en `/mnt/c/...`. El acceso a archivos de Windows desde WSL es considerablemente más lento y afecta a Vite y Composer.

#### Paso 1 · Instalar dependencias del sistema (si no están instaladas)

```bash
sudo apt update
sudo apt install -y php8.4-cli php8.4-sqlite3 php8.4-mbstring php8.4-xml \
    php8.4-curl php8.4-zip php8.4-bcmath unzip git

# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Node.js mediante NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
```

> Si `apt` no encuentra los paquetes `php8.4-*`, agrega primero el repositorio `ppa:ondrej/php`.

#### Paso 2 · Clonar el repositorio e instalar dependencias

```bash
git clone <URL-del-repositorio> ~/proyectos/curso-laravel
cd ~/proyectos/curso-laravel

composer install
npm install
```

#### Paso 3 · Configurar el entorno

```bash
cp .env.example .env
php artisan key:generate          # genera APP_KEY
touch database/database.sqlite    # crea la base de datos SQLite
php artisan migrate --seed        # crea tablas y datos de prueba
```

El seeder crea el usuario `guardia@registro.test` con contraseña `password` y carga departamentos, visitantes y visitas de ejemplo.

#### Paso 4 · Levantar los servidores de desarrollo

Se requieren **dos procesos simultáneos**, cada uno en su propia terminal:

```bash
# Terminal 1 — servidor de Laravel (backend)
php artisan serve
```

```bash
# Terminal 2 — servidor de Vite (frontend con recarga en caliente)
npm run dev
```

Abrir en el navegador de Windows: **http://localhost:8000**

> **Alternativa:** `composer run dev` ejecuta `php artisan dev`, que levanta los procesos de desarrollo en una sola terminal.

#### Solución de problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `Vite manifest not found` | Vite no está corriendo y no hay build | Ejecutar `npm run dev` o `npm run build` |
| `could not find driver (sqlite)` | Falta la extensión de SQLite | `sudo apt install php8.4-sqlite3` |
| `No application encryption key` | Falta `APP_KEY` | `php artisan key:generate` |
| Página en blanco sin estilos | El navegador no llega al servidor de Vite | Verificar que `npm run dev` siga activo |
| `SQLSTATE: no such table` | Migraciones pendientes | `php artisan migrate` |

### 5.3 Contenedorización con Docker

El `Dockerfile` utiliza una **construcción multi-etapa** (*multi-stage build*), que separa la compilación del frontend de la imagen final de ejecución. Así se obtiene una imagen de producción sin Node.js ni `node_modules`.

| Etapa | Imagen base | Responsabilidad |
|---|---|---|
| **1 · `frontend`** | `node:22-alpine` | `npm ci` + `npm run build` → genera `public/build/` (JS y CSS minificados con manifiesto de Vite) |
| **2 · Ejecución** | `php:8.4-apache` | Instala extensiones (`pdo_pgsql`, `pdo_mysql`, `mbstring`, `gd`, `zip`, `bcmath`, etc.), copia el código y `public/build/` desde la etapa 1, ejecuta `composer install --no-dev --optimize-autoloader`, apunta el `DocumentRoot` de Apache a `/public`, habilita `mod_rewrite` y asigna permisos a `storage/` y `bootstrap/cache/` |

**Comando de arranque:**

```dockerfile
CMD php artisan migrate --force --seed && apache2-foreground
```

- `migrate --force`: aplica las migraciones pendientes en cada arranque. `--force` es obligatorio porque Laravel solicita confirmación cuando `APP_ENV=production`.
- `--seed`: ejecuta los seeders. Usan `firstOrCreate`, por lo que el usuario inicial no se duplica entre despliegues.
- `apache2-foreground`: mantiene Apache como proceso principal del contenedor.

**Prueba local de la imagen (opcional):**

```bash
docker build -t control-accesos .
docker run --rm -p 8080:80 \
  -e APP_KEY="$(php artisan key:generate --show)" \
  -e DB_CONNECTION=sqlite \
  control-accesos
```

### 5.4 Despliegue continuo en Render (PaaS)

El archivo `render.yaml` define la infraestructura como código (*Render Blueprint*): una base de datos PostgreSQL y un servicio web Docker, ambos en el plan gratuito.

```mermaid
flowchart LR
    DEV["👨‍💻 Desarrollador<br/>WSL 2"] -- "git push origin main" --> GH["GitHub<br/>repositorio"]
    GH -- "webhook de despliegue automático" --> RB["Render<br/>Build"]

    subgraph RENDER["Render (PaaS)"]
        RB -- "docker build (multi-stage)" --> IMG["Imagen<br/>php:8.4-apache"]
        IMG --> RUN["Contenedor<br/>migrate --force --seed<br/>apache2-foreground"]
        RUN -- "DB_URL (red interna, SSL)" --> PG[("PostgreSQL<br/>curso-laravel-db")]
        HC["Health check<br/>GET /up"] -.-> RUN
    end

    USR["🌐 Usuarios<br/>Recepción · Guardia · Admin"] -- "HTTPS" --> PROXY["Proxy TLS de Render"]
    PROXY -- "HTTP :80" --> RUN
```

#### Variables de entorno en producción

| Variable | Valor / Origen | Propósito |
|---|---|---|
| `APP_ENV` | `production` | Activa el modo de producción (caché, confirmación de comandos destructivos) |
| `APP_DEBUG` | `"false"` | Oculta trazas de error al usuario final |
| `APP_KEY` | `generateValue: true` | Llave de cifrado de sesiones y cookies |
| `DB_CONNECTION` | `pgsql` | Selecciona el driver de PostgreSQL |
| `DB_URL` | `fromDatabase → connectionString` | Cadena de conexión completa (`postgresql://usuario:clave@host:5432/curso_laravel`) inyectada por Render. Laravel la lee en `config/database.php` (`'url' => env('DB_URL')`) y tiene prioridad sobre `DB_HOST`, `DB_PORT`, etc. |
| `DB_SSLMODE` | `require` | Obliga el cifrado TLS en la conexión a la base de datos |
| `LOG_CHANNEL` | `stderr` | Envía los logs a la consola de Render |
| `APP_URL` | *(no definida)* — 🔲 recomendada | URL pública `https://<servicio>.onrender.com`, usada para generar enlaces absolutos |

> **Sobre `APP_KEY`:** Laravel espera el formato `base64:<32 bytes codificados>`. Se recomienda generar la llave con `php artisan key:generate --show` y registrarla manualmente en el panel de Render, en lugar de depender de `generateValue`.

#### HTTPS y `secure_asset` 🔲

Render termina la conexión TLS en su proxy y reenvía la petición al contenedor por HTTP. En consecuencia, Laravel detecta el esquema `http` y puede generar URLs de assets (`@vite`, `asset()`) con `http://`. El navegador las bloquea como **contenido mixto** (*mixed content*) y la página se muestra sin estilos ni JavaScript.

| Alternativa | Alcance | Recomendación |
|---|---|---|
| `secure_asset('ruta')` | Genera una URL `https://` para un asset puntual | Útil en casos aislados; no cubre las URLs que genera `@vite` |
| `URL::forceScheme('https')` | Fuerza `https` en todas las URLs generadas | ✔ Recomendada, condicionada a producción |
| `trustProxies(at: '*')` | Laravel confía en las cabeceras `X-Forwarded-Proto` del proxy | ✔ Recomendada en conjunto con la anterior |

```php
// app/Providers/AppServiceProvider.php
public function boot(): void
{
    if ($this->app->environment('production')) {
        \Illuminate\Support\Facades\URL::forceScheme('https');
    }
}
```

```php
// bootstrap/app.php
->withMiddleware(function (Middleware $middleware) {
    $middleware->trustProxies(at: '*');
    // ...
})
```

#### Observaciones de despliegue

| # | Observación | Riesgo | Recomendación |
|---|---|---|---|
| 1 | Las migraciones se declaran dos veces: en `preDeployCommand` (`render.yaml`) y en el `CMD` del `Dockerfile`. | Bajo (la segunda ejecución no encuentra migraciones pendientes), pero genera confusión. | Conservar solo un mecanismo. En el plan gratuito de Render el *pre-deploy command* no está disponible, por lo que el `CMD` es el que opera actualmente. |
| 2 | `--seed` se ejecuta en producción y crea el usuario `guardia@registro.test` con contraseña `password`. | **Alto** una vez que exista inicio de sesión: es una credencial pública. | Separar un seeder de producción con credenciales tomadas de variables de entorno, o retirar `--seed` del `CMD`. |
| 3 | No existe validación automática antes del despliegue. | Medio: un cambio con errores llega directamente a producción. | Agregar un flujo de GitHub Actions que ejecute `php artisan test` (ver 6.5). |

---

## 6. Aseguramiento de Calidad (Testing)

### 6.1 Estrategia de pruebas

El proyecto utiliza **pruebas de integración (Feature Tests)** con **PHPUnit 12**. Cada prueba simula una petición HTTP completa (ruta → middleware → FormRequest → controlador → servicio → modelo → base de datos) y verifica la respuesta. Este enfoque valida los flujos de extremo a extremo del backend sin necesidad de un navegador.

| Técnica | Herramienta | Propósito |
|---|---|---|
| Base de datos aislada | Trait `RefreshDatabase` + SQLite `:memory:` | Cada prueba inicia con una BD limpia y migrada; las pruebas son independientes y rápidas |
| Aserciones de Inertia | `assertInertia(fn ($page) => $page->component(...)->has(...))` | Verifica qué componente React se renderiza y qué *props* recibe |
| Aserciones de persistencia | `assertDatabaseHas` / `assertDatabaseMissing` | Confirma que los datos se guardaron, actualizaron o eliminaron |
| Aserciones de validación | `assertSessionHasErrors([...])` | Confirma que las FormRequests rechazan datos inválidos |
| Aserciones de flujo | `assertRedirect`, `assertSessionHas('message')`, `assertNotFound` | Verifica redirecciones, mensajes flash y respuestas 404 |
| Datos de prueba | Factories (`User::factory()`) y `Model::create()` | Generan el estado previo necesario para cada escenario |

La configuración del entorno de pruebas se define en `phpunit.xml`:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
<env name="DB_URL" value=""/>
```

`DB_URL` se vacía para garantizar que las pruebas **nunca** se conecten a la base de datos de producción, aun si la variable existe en el entorno.

### 6.2 Cobertura funcional por módulo

| Escenario probado | `DepartmentCrudTest` | `VisitorsCrudTest` | `VisitsCrudTest` |
|---|---|---|---|
| Listado con datos (componente + *props*) | `test_listadepartamentos` | `test_listavisitantes` | `test_vista` |
| Mostrar formulario de alta | `test_formcreate` | `test_formcreate` | `test_formcreate` |
| Crear registro válido | `test_create` | `test_create` | `test_create` |
| Rechazar formulario vacío | `test_createsindatos` | `test_createsindatos` | `test_createsindatos` |
| Regla de negocio específica | `test_nameduplicados` (nombre único) | `test_identificationduplicado` (identificación única) | `test_idinvalido` (FK inexistentes) |
| Mostrar formulario de edición | `test_puede_mostrar_el_formulario_de_edicion` | `test_edit` | `test_edit` |
| Actualizar registro | `test_puede_actualizar_un_departamento` | `test_actualizar` | `test_actualizar` |
| Eliminar registro | `test_puede_eliminar_un_departamento` | `test_delete` | `test_delete` |
| Registro inexistente → 404 | `test_un_departamento_inexistente_devuelve_404_al_editar` | `test_inexistente` | `test_inexistente` |
| **Total** | **9** | **9** | **9** |

Adicionalmente existen dos pruebas de ejemplo del framework (`tests/Feature/ExampleTest.php` y `tests/Unit/ExampleTest.php`).

### 6.3 Resultados de la última ejecución

Ejecución realizada el **19 de octubre de 2026** sobre la rama `main`:

| Métrica | Resultado |
|---|---|
| Pruebas ejecutadas | **29** |
| Pruebas exitosas | **29** (100 %) |
| Aserciones | **164** |
| Fallos / Errores | 0 |
| Tiempo de ejecución | ≈ 0.4 s |
| Versión | PHPUnit 12.5.33 |

### 6.4 Ejecución de las pruebas

```bash
# Ejecutar toda la suite
php artisan test

# Alternativa: limpia la caché de configuración y ejecuta la suite
composer test

# Ejecutar un solo archivo o una sola prueba
php artisan test --filter=VisitsCrudTest
php artisan test --filter=test_identificationduplicado

# Ejecutar en paralelo
php artisan test --parallel

# Reporte de cobertura de código (requiere Xdebug o PCOV)
php artisan test --coverage
```

### 6.5 Plan de pruebas pendiente

| Prueba planeada | Tipo | Verifica |
|---|---|---|
| `AuthenticationTest` | Feature | Que las rutas protegidas redirijan a login si no hay sesión |
| `RoleAccessTest` | Feature | Que cada rol reciba **403** en los módulos no autorizados, según la matriz 4.2 (por ejemplo, `guardia` → `POST /visitas`) |
| `MarkExitTest` | Feature | Que "Marcar Salida" asigne `exit_time` y `status = 'completado'`, y que no sobrescriba una salida previa |
| `VehiclesCrudTest` | Feature | CRUD de vehículos y la regla de placas con ingreso abierto |
| `VisitServiceTest` | Unit | Lógica de los servicios aislada de HTTP |

**Integración continua recomendada** (`.github/workflows/tests.yml`): ejecutar la suite en cada `push` y *pull request*, de modo que Render solo despliegue código que pasó las pruebas.

```yaml
name: tests
on: [push, pull_request]

jobs:
  phpunit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.4'
          extensions: pdo_sqlite, mbstring
      - run: composer install --no-interaction --prefer-dist
      - run: cp .env.example .env && php artisan key:generate
      - run: php artisan test
```

En el panel de Render puede activarse la opción **"Auto-Deploy: After CI Checks Pass"** para que el despliegue espere el resultado de este flujo.

---

*Fin del documento.*
