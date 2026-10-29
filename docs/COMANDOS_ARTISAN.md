# Guía de Comandos Artisan

**Sistema de Registro y Control de Accesos** · Laravel 13 · Guía de estudio

Este documento tiene dos partes:

1. **⏪ Pasado:** los comandos que probablemente se usaron para crear el backend actual, deducidos a partir del código y del historial de Git.
2. **🚀 Futuro:** los comandos exactos, en orden, para construir lo que falta (roles, autenticación y vehículos).

Al final hay una **referencia de banderas** para consultar mientras estudias.

---

## Contenido

- [Parte 1 · Pasado: historial deducido](#parte-1--pasado-historial-deducido)
- [Parte 2 · Futuro: comandos por ejecutar](#parte-2--futuro-comandos-por-ejecutar)
- [Referencia de banderas](#referencia-de-banderas)
- [Comandos de uso diario](#comandos-de-uso-diario)

---

# Parte 1 · Pasado: historial deducido

## 1.1 Cómo se dedujo

Cada comando `make:` genera un archivo a partir de una **plantilla (stub)**, y cada bandera deja una huella reconocible. Se compararon las **primeras versiones** de cada archivo en Git con las plantillas de Laravel:

| Huella en el archivo original | Qué revela |
|---|---|
| El modelo contiene solo `class visits extends Model { // }`, sin `use HasFactory` | Se creó **sin `-f`** |
| Las migraciones se guardaron en un commit y los modelos en otro, 14 horas después | Las migraciones se crearon **antes** y por separado: **no se usó `-m`** |
| `UserController` conserva los 7 métodos vacíos (`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`) | Se usó **`--resource`** |
| Los demás controladores empezaron con un solo método escrito a mano | Controlador **simple, sin banderas** |
| `StoreDepartmentRequest` conserva el comentario *"Determine if the user is authorized..."* | Generado con **`make:request`** |
| Los servicios no traen el constructor vacío que agrega `make:class` | Creados **a mano** |

**Nivel de certeza:** 🟢 Alta = la huella es inequívoca · 🟡 Media = hay una alternativa igual de probable.

## 1.2 Cronología de comandos

### 24 de agosto · Inicio del curso: rutas y controladores

```bash
php artisan make:controller homecontroller      # 🟢 empezó con un método index() que devolvía texto
php artisan make:controller postcontroller      # 🟢 ejercicio de práctica: index, create y show(string $post)
```

> `homecontroller` se convirtió después **a mano** en un controlador de acción única (`__invoke`). `postcontroller` se **renombró a mano** a `departmentscontroller` el 6 de septiembre (commit `197c5d9`), por eso conserva el método `show(string $id)` vacío.

### 28 de agosto (≈ 21:50 hora local) · Migraciones

Los nombres de archivo tienen la hora en UTC: `2026_08_29_035036`, `…035110` y `…035133`, con entre 23 y 34 segundos de diferencia.

```bash
php artisan make:migration create_departments_table   # 🟡
php artisan make:migration create_visitors_table      # 🟡
php artisan make:migration create_visits_table        # 🟡
```

> Laravel deduce `Schema::create('departments')` a partir del nombre `create_departments_table`, así que no hizo falta `--create=departments`.
> **Alternativa 🟡:** `make:model departments -m` (y lo mismo para los otros dos), guardando los modelos en un commit posterior. Es menos probable, porque el commit de las migraciones (`ccc9b1a`) no incluyó ningún modelo.

### 31 de agosto · Modelos

```bash
php artisan make:model departments     # 🟢 sin -f, sin -m
php artisan make:model visitors        # 🟢
php artisan make:model visits          # 🟢
```

> Los nombres en **plural y minúscula** (`departments`) no siguen la convención de Laravel (`Department`). Por eso el modelo necesita `protected $table = 'departments';` y las factories se llaman `departmentsFactory`.

### 4 al 11 de septiembre · Seeders y factories

```bash
php artisan make:seeder departmentseeder                          # 🟢 4 sep
php artisan make:factory departmentsFactory --model=departments   # 🟢 5 sep
php artisan make:factory visitorsFactory --model=visitors         # 🟢 11 sep
php artisan make:factory visitsFactory --model=visits             # 🟢 11 sep
php artisan make:seeder visitorSeeder                             # 🟢 11 sep
php artisan make:seeder visitSeeder                               # 🟢 11 sep
```

> El commit de la primera factory (`695447b`) también agrega `use HasFactory;` al modelo. Eso confirma que la factory se creó **después** del modelo y que la línea se añadió a mano (con `-f` habría venido incluida).

### 6 de septiembre · Controladores de visitantes, visitas y usuarios

```bash
php artisan make:controller VisitorController              # 🟢 empezó con un index() que devolvía una vista
php artisan make:controller VisitController                # 🟢 ídem
php artisan make:controller UserController --resource      # 🟢 conserva intactos los 7 métodos del stub
```

### 21 al 30 de septiembre · FormRequests (en subcarpetas)

```bash
php artisan make:request Departments/StoreDepartmentRequest   # 🟢 21 sep
php artisan make:request Departments/UpdateDepartmentRequest  # 🟢 23 sep
php artisan make:request Visitors/StoreVisitorRequest         # 🟢 23 sep
php artisan make:request Visitors/UpdateVisitorRequest        # 🟢 23 sep
php artisan make:request Visits/StoreVisitRequest             # 🟢 30 sep
php artisan make:request Visits/UpdateVisitRequest            # 🟢 30 sep
```

> La barra `/` en el nombre crea la subcarpeta y el namespace (`App\Http\Requests\Departments`). El stub devuelve `authorize(): false`; se cambió a `true` a mano.

### 21 al 30 de septiembre · Capa de servicios (sin Artisan)

Se crearon **a mano**, sin comando:

```text
app/service/departments/DepartmentService.php
app/service/visitors/VisitorService.php
app/service/visits/VisitService.php
```

> Hoy existe un comando para esto: `php artisan make:class service/departments/DepartmentService`.

### 23 al 30 de septiembre · Pruebas

```bash
php artisan make:test DepartmentCrudTest    # 🟢 23 sep (Feature es el tipo por defecto)
php artisan make:test VisitorsCrudTest      # 🟢 28 sep
php artisan make:test VisitsCrudTest        # 🟢 30 sep
```

## 1.3 Resumen: ¿se usó `-a` o `-mcr`?

**No.** Todo se generó **pieza por pieza**, con un comando por archivo. Es un camino válido para aprender, porque permite ver qué produce cada comando.

## 1.4 Cómo lo harías hoy en un solo comando

Para un módulo nuevo que siga las convenciones de Laravel (nombre en singular y PascalCase):

```bash
# Modelo + migración + factory + seeder + controlador resource + FormRequests
php artisan make:model Department -mfsc -r -R

# Equivalente "todo incluido" (agrega además una Policy)
php artisan make:model Department -a
```

| Archivo generado | Con `-mfsc -r -R` | Con `-a` |
|---|:---:|:---:|
| `app/Models/Department.php` | ✅ | ✅ |
| Migración `create_departments_table` | ✅ | ✅ |
| `DepartmentFactory` | ✅ | ✅ |
| `DepartmentSeeder` | ✅ | ✅ |
| `DepartmentController` con los 7 métodos | ✅ | ✅ |
| `StoreDepartmentRequest` y `UpdateDepartmentRequest` | ✅ | ✅ |
| `DepartmentPolicy` | — | ✅ |

> ⚠️ `-R` crea los FormRequests en la raíz de `app/Http/Requests/`. Si quieres mantener tus subcarpetas (`Departments/`), créalos aparte con `make:request Departments/...`.

---

# Parte 2 · Futuro: comandos por ejecutar

> Orden alineado con [ROADMAP_BACKEND_PENDIENTE.md](ROADMAP_BACKEND_PENDIENTE.md), que contiene el código de cada archivo.
> **Regla de oro:** después de cada bloque ejecuta `php artisan test`. Si algo falla, lo detectas a tiempo.

## 2.0 Preparación

```bash
git checkout -b feature/roles-y-vehiculos
php artisan test                     # línea base: debe estar en verde
```

## 2.1 Autenticación manual (`AuthController`)

**Recomendación: hacerla manual.** Los *starter kits* de Laravel están pensados para proyectos **nuevos**: sobrescriben rutas, layouts y páginas React que ya personalizaste. Para un sistema interno basta un login de sesión con dos métodos: entrar y salir.

```bash
# Columnas que el login necesita: "Recordarme" y desactivar usuarios sin borrarlos
php artisan make:migration add_remember_token_and_is_active_to_users_table --table=users

# Controlador con login (mostrar formulario, autenticar) y logout
php artisan make:controller Auth/AuthController

# Validación del formulario de login
php artisan make:request Auth/LoginRequest

# Prueba de autenticación
php artisan make:test AuthenticationTest

php artisan migrate
```

| Método de `AuthController` | Ruta | Qué hace |
|---|---|---|
| `showLogin()` | `GET /login` | Muestra la página React `Auth/Login` |
| `login(LoginRequest $request)` | `POST /login` | `Auth::attempt()` y regenera la sesión |
| `logout(Request $request)` | `POST /logout` | Cierra la sesión e invalida el token |

## 2.2 Roles y middleware (RBAC)

```bash
# Enum con los 3 roles (respaldado por string: 'admin', 'recepcion', 'guardia')
php artisan make:enum Enums/UserRole --string

# Middleware que verifica el rol: uso → ->middleware('role:admin,recepcion')
php artisan make:middleware EnsureUserHasRole

# Prueba de que cada rol recibe 403 donde no tiene permiso
php artisan make:test RoleAccessTest
```

Después, a mano:

1. Registrar el alias `role` en `bootstrap/app.php` (`$middleware->alias([...])`).
2. Agrupar las rutas en `routes/web.php` por rol.
3. Agregar `actingAs()` a las pruebas existentes.

```bash
php artisan route:list --except-vendor   # comprueba qué middleware tiene cada ruta
php artisan test
```

## 2.3 Recepción: "Marcar Salida"

No requiere archivos nuevos, solo métodos en `VisitService` y `VisitController`.

```bash
# Opcional: guardar qué usuario registró la salida
php artisan make:migration add_exited_by_to_visits_table --table=visits

php artisan make:test MarkExitTest
php artisan migrate
php artisan test
```

## 2.4 Guardia: módulo de vehículos 🚗

```bash
# 1. Modelo + migración + factory + seeder (convención Laravel: singular y PascalCase)
php artisan make:model Vehicle -mfs

# 2. Controlador resource (index, create, store, edit, update, destroy...)
php artisan make:controller VehicleController --resource

# 3. FormRequests en subcarpeta, siguiendo tu convención actual
php artisan make:request Vehicles/StoreVehicleRequest
php artisan make:request Vehicles/UpdateVehicleRequest

# 4. Servicio (namespace App\service\vehicles, igual que los existentes)
php artisan make:class service/vehicles/VehicleService

# 5. Pruebas
php artisan make:test VehiclesCrudTest

# 6. Aplicar la migración y probar
php artisan migrate
php artisan test
```

> **Atajo equivalente para los pasos 1 y 2:** `php artisan make:model Vehicle -mfsc -r`

**Columnas de la migración `create_vehicles_table`:** `user_id` (FK guardia), `visitor_id` (FK opcional), `plate_number`, `brand`, `color`, `vehicle_type` (enum: sedan, camioneta, motocicleta, pickup, otro), `driver_name`, `entry_time`, `exit_time`. El código completo está en el roadmap, sección 6.2.

## 2.5 Administrador: usuarios

`UserController` ya existe (resource), así que solo faltan las piezas de apoyo:

```bash
php artisan make:request Users/StoreUserRequest
php artisan make:request Users/UpdateUserRequest
php artisan make:class service/users/UserService
php artisan make:test UsersCrudTest
php artisan test
```

## 2.6 Endurecimiento para producción

```bash
# Índices únicos en BD (hoy la unicidad solo se valida en las FormRequests)
php artisan make:migration add_unique_indexes_to_departments_and_visitors

# Primer administrador con credenciales tomadas de variables de entorno
php artisan make:seeder AdminUserSeeder

# Archivos de traducción para mensajes de validación en español
php artisan lang:publish

php artisan migrate
php artisan test
```

## 2.7 Lista completa en orden (para copiar)

```bash
git checkout -b feature/roles-y-vehiculos
php artisan test

# Autenticación
php artisan make:migration add_remember_token_and_is_active_to_users_table --table=users
php artisan make:controller Auth/AuthController
php artisan make:request Auth/LoginRequest
php artisan make:test AuthenticationTest

# RBAC
php artisan make:enum Enums/UserRole --string
php artisan make:middleware EnsureUserHasRole
php artisan make:test RoleAccessTest

# Recepción
php artisan make:migration add_exited_by_to_visits_table --table=visits
php artisan make:test MarkExitTest

# Guardia
php artisan make:model Vehicle -mfs
php artisan make:controller VehicleController --resource
php artisan make:request Vehicles/StoreVehicleRequest
php artisan make:request Vehicles/UpdateVehicleRequest
php artisan make:class service/vehicles/VehicleService
php artisan make:test VehiclesCrudTest

# Administrador
php artisan make:request Users/StoreUserRequest
php artisan make:request Users/UpdateUserRequest
php artisan make:class service/users/UserService
php artisan make:test UsersCrudTest

# Producción
php artisan make:migration add_unique_indexes_to_departments_and_visitors
php artisan make:seeder AdminUserSeeder
php artisan lang:publish

# Aplicar y verificar
php artisan migrate
php artisan route:list --except-vendor
php artisan test
```

---

# Referencia de banderas

> Verificado con `php artisan <comando> --help` en Laravel 13 de este proyecto.

## `make:model`

| Bandera | Larga | Qué genera |
|---|---|---|
| `-m` | `--migration` | Migración `create_<tabla>_table` |
| `-f` | `--factory` | Factory y agrega `use HasFactory` al modelo |
| `-s` | `--seed` | Seeder |
| `-c` | `--controller` | Controlador vacío asociado al modelo |
| `-r` | `--resource` | Hace que el controlador de `-c` sea *resource* (7 métodos CRUD) |
| `-R` | `--requests` | FormRequests `Store…` y `Update…`, ya conectados en el controlador |
| | `--api` | Controlador *resource* sin `create` ni `edit` (no hay formularios en una API) |
| | `--policy` | Policy de autorización. ⚠️ En Laravel 13 **no** tiene forma corta: `-p` significa *pivot* |
| `-p` | `--pivot` | Modelo para tabla intermedia de una relación muchos a muchos |
| `-a` | `--all` | Todo: `-m -f -s -c -r -R` + `--policy` |
| | `--test` | Prueba asociada al modelo |

> Las banderas cortas se pueden combinar: `-mfs` es lo mismo que `-m -f -s`.

## `make:controller`

| Bandera | Larga | Qué hace |
|---|---|---|
| `-r` | `--resource` | Genera `index`, `create`, `store`, `show`, `edit`, `update` y `destroy` |
| | `--api` | Como `--resource` pero sin `create` ni `edit` |
| `-i` | `--invokable` | Un solo método `__invoke()` (como tu `homecontroller`) |
| `-m` | `--model=Modelo` | *Resource* con inyección del modelo: `show(Vehicle $vehicle)` en vez de `show(int $id)` |
| `-R` | `--requests` | Crea y conecta los FormRequests de `store` y `update` |
| `-s` | `--singleton` | Recurso único, sin listado ni `{id}` (p. ej. el perfil del usuario) |
| `-p` | `--parent=Modelo` | Recurso anidado (p. ej. `/departamentos/{id}/visitas`) |

## `make:migration`

| Bandera | Qué hace | Ejemplo |
|---|---|---|
| `--create=tabla` | Plantilla con `Schema::create()` | `make:migration create_vehicles_table --create=vehicles` |
| `--table=tabla` | Plantilla con `Schema::table()` para **modificar** una tabla | `make:migration add_is_active_to_users_table --table=users` |

> Si el nombre sigue el patrón `create_X_table` o `add_..._to_X_table`, Laravel deduce la tabla sola y las banderas son opcionales.

## Otros comandos `make:`

| Comando | Bandera útil | Qué genera |
|---|---|---|
| `make:request Carpeta/Nombre` | — | FormRequest con `authorize()` y `rules()`. La `/` crea la subcarpeta |
| `make:middleware Nombre` | `--test` | Middleware en `app/Http/Middleware/` |
| `make:enum Ruta/Nombre` | `-s` / `--string`, `-i` / `--int` | Enum de PHP 8.1+, respaldado por string o int |
| `make:class Ruta/Nombre` | `-i` / `--invokable` | Clase PHP genérica dentro de `app/` (ideal para servicios) |
| `make:factory Nombre` | `-m` / `--model=Modelo` | Factory ligada al modelo |
| `make:seeder Nombre` | — | Seeder en `database/seeders/` |
| `make:test Nombre` | `-u` / `--unit` | Prueba Feature (por defecto) o Unit |

---

# Comandos de uso diario

| Comando | Para qué sirve |
|---|---|
| `php artisan migrate` | Aplica las migraciones pendientes |
| `php artisan migrate:status` | Muestra qué migraciones ya se aplicaron |
| `php artisan migrate:rollback` | Revierte el último lote de migraciones |
| `php artisan migrate:fresh --seed` | ⚠️ **Borra todas las tablas**, migra desde cero y ejecuta los seeders. Solo en local |
| `php artisan db:seed --class=AdminUserSeeder` | Ejecuta un seeder específico |
| `php artisan route:list --except-vendor` | Lista tus rutas con su controlador y middleware |
| `php artisan test` | Ejecuta todas las pruebas |
| `php artisan test --filter=VehiclesCrudTest` | Ejecuta solo un archivo o una prueba |
| `php artisan tinker` | Consola interactiva para probar consultas Eloquent |
| `php artisan optimize:clear` | Limpia cachés de configuración, rutas y vistas |
| `php artisan serve` | Servidor de desarrollo en `http://localhost:8000` |
