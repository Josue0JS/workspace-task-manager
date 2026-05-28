# Workspace — Gestor de Tareas y Productividad

Aplicación web SPA construida con React + Vite para gestionar las tareas diarias de un equipo de trabajo. Permite crear, leer, actualizar y eliminar tareas con persistencia real vía API REST mockeada, sesión simulada con LocalStorage y una interfaz moderna con tema oscuro.

## Stack Tecnológico

| Categoría            | Tecnología                  |
|----------------------|-----------------------------|
| Framework            | React 18 + Vite 5           |
| Enrutamiento         | react-router-dom v6         |
| Estado / Efectos     | useState, useEffect, Context API |
| Peticiones HTTP      | Axios                       |
| Alertas              | SweetAlert2                 |
| Estilos              | Tailwind CSS v3             |
| Sesión               | LocalStorage                |
| Control de versiones | Git + GitHub (GitFlow)      |
| API Mock             | MockAPI (mockapi.io)        |

## Características

- **Autenticación simulada** — registro de nombre y departamento persistido en LocalStorage; rutas protegidas.
- **CRUD completo de tareas** — crear, listar, editar, cambiar estado y eliminar con confirmación SweetAlert2.
- **Filtrado en cliente** — filtra tareas por estado (Pendiente / En Progreso / Completada) sin nuevas peticiones.
- **Estadísticas y progreso** — barra de progreso general y contadores por estado.
- **Feedback visual** — skeletons durante la carga, alertas de éxito/error, indicador de tareas vencidas.
- **Totalmente responsivo** — funciona en móvil, tablet y escritorio.

## API Mockeada

Proyecto en MockAPI con el recurso `/tareas`.

**Campos del recurso:**
```
id              (auto)
titulo          (string)
descripcion     (string)
fechaVencimiento (string — ISO date)
estado          (string — "Pendiente" | "En Progreso" | "Completada")
createdAt       (auto)
```

> URL del recurso: https://6a17bf0c1878294b597bcf20.mockapi.io/api/v1/tareas

## Cómo ejecutar localmente

### Prerequisitos

- Node.js ≥ 18
- npm ≥ 9

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Josue0JS/workspace-task-manager.git
cd workspace-task-manager

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env y reemplaza VITE_API_URL con tu endpoint de MockAPI

# 4. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### Build para producción

```bash
npm run build
npm run preview   # sirve el build localmente
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── layout/        # Navbar, ProtectedRoute
│   ├── tasks/         # TaskCard, TaskForm, FilterBar, StatsBar
│   └── ui/            # Spinner, Skeleton, EmptyState, InputField…
├── context/           # AuthContext (sesión)
├── hooks/             # useTasks (CRUD + estado)
├── pages/             # LoginPage, DashboardPage
├── services/          # taskService.js (axios)
└── utils/             # constants.js (ESTADOS, DEPARTAMENTOS, helpers)
```

## Flujo GitFlow utilizado

```
main          ← producción estable
└── develop   ← integración
    ├── feature/login-component
    ├── feature/task-crud-api
    ├── feature/filter-and-stats
    └── feature/ui-polish
```

## Despliegue

La aplicación está desplegada en Vercel:  
🔗 **[URL_DE_VERCEL_AQUI]**

---

Desarrollado como prueba técnica para la vacante de **Desarrollador Frontend Junior (React)**.  
Mayo 2026.
