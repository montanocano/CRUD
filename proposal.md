# Change: crud-personas-departamentos-azure-api

## What

A complete CRUD application (React/React Native / TypeScript) to list, create, update and delete Personas and Departamentos using the provided Azure API:
https://proyectoconbasededatosyapi-h4ebgab7f8cqc0bj.spaincentral-01.azurewebsites.net

Project structure follows Clean Architecture + MVVM, DI container, and MobX view models. UI screens: Welcome, ListadoPersonas, EditarInsertarPersona, ListadoDepartamentos, EditarInsertarDepartamento.

## Why

- Exercise for Clean Architecture and MVVM patterns
- Real API integration for end-to-end CRUD
- Validate business rules (age/day restrictions) in use-cases layer
- Prepare optional image upload path to Azure storage

## Scope (this change)

- Design and planning artifacts to enable implementation: proposal, design, and tasks.
- Use the exact screen and file structure described by the user.

## Non-goals

- Not implementing code in this change; implementation will be a follow-up (/opsx:apply).

## Notes

- Business rules: Fridays & Saturdays: show only persons older than 18. Sundays: deleting persons is forbidden.
- API base URL provided above; adjust BaseApi.BASE_URL accordingly when implementing.
