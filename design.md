# Design: CRUD Personas & Departamentos (Clean Architecture + MVVM)

## High-level architecture

- Presentation: Screens (React Router / React Navigation), Components, MobX ViewModels (singleton getInstance()).
- UI Models: PersonaUIModel, DepartamentoUIModel (derive color, initials).
- Domain: Entities (Persona, Departamento), UseCases (PersonaUseCases, DepartamentoUseCases) — contain business rules.
- Data: APIs (PersonaApi, DepartamentoApi) wrap HTTP; Repositories delegate to APIs.
- Core: BaseApi (BASE_URL points to the provided Azure API), DI container (inversify), TYPES bindings.

## Routing & layout

- _layout.tsx (RootLayout): sets a Stack with index, WelcomeScreen, ListadoPersonasScreen, EditarInsertarPersonaScreen, ListadoDepartamentos; headerShown: false.
- Index screen: default export Index() -> state: loading,error -> useEffect initializeApp() -> loadDepartamentos, loadPersonas -> router.replace('/screens/WelcomeScreen').

## Screens behavior

- WelcomeScreen: header, two navigable cards (Personas, Departamentos), info cards, footer.
- ListadoPersonasScreen (observer): personasVM.loadPersonas() on mount; shows ActivityIndicator while loading; errorContainer on error; header with back and count; FlatList of PersonaListItem; FAB to add.
- EditarInsertarPersonaScreen (observer): personasVM & departamentosVM; form state (nombre, apellidos, telefono, direccion, foto URL, idDepartamento); preview (avatar or initials); validation; handleGuardar() creates or updates via PersonaUseCases then router.back().
- ListadoDepartamentos: similar to personas; renderDepartamento card with icon, name, delete.

## Business rules (where implemented)

- UseCases layer enforces rules:
  - getPersonas(): if day is Fri/Sat then filter persons with age > 18 (calculate from fechaNac).
  - deletePersona(): if day is Sunday -> throw ForbiddenOperationError (handled up in ViewModel to show user-friendly message).

## APIs and endpoints

- BaseApi.BASE_URL must be set to: https://proyectoconbasededatosyapi-h4ebgab7f8cqc0bj.spaincentral-01.azurewebsites.net
- PersonaApi endpoints:
  - GET /api/Personas
  - GET /api/Personas/{id}
  - POST /api/Personas
  - PUT /api/Personas/{id}
  - DELETE /api/Personas/{id}
  - POST /api/Personas/upload-image (optional — confirm server supports it)
- DepartamentoApi endpoints:
  - GET /api/Departamentos
  - GET /api/Departamentos/{id}
  - POST /api/Departamentos
  - PUT /api/Departamentos/{id}
  - DELETE /api/Departamentos/{id}

## Error handling and UX

- ViewModels expose isLoading and error observable fields.
- Screens render errorContainer (icon, title, detail) when error.
- InitializeApp() handles parallel loading of departamentos and personas; on success navigate to WelcomeScreen.

## DI & testing hooks

- container.binds as listed by the user.
- For easier testing, add optional env override to BaseApi to target mock servers.

## Data mapping

- PersonaDTO -> Persona entity -> PersonaUIModel (color, initials). Map nombreDepartamento from DTO when present.

## Notes on image upload

- If API supports upload-image, PersonaApi.uploadImage should convert to FormData and POST; otherwise allow storing remote URLs.

## Security / CORS

- Ensure mobile/web client correctly handles CORS when testing against Azure endpoint; consider a proxy during dev if needed.
