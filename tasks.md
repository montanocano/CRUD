# Implementation tasks: crud-personas-departamentos-azure-api

Change root: repository root (C:\Users\Usuario\Desktop\Interfaces\01CRUD)

Priority order: design -> core wiring -> data -> domain -> presentation -> polish

- [x] Prep: update BaseApi BASE_URL
   - File: src/core/BaseApi.ts
   - Changed BASE_URL constant to the provided Azure URL (done).
   - Quick test: GET /api/Departamentos with curl or fetch.

- [x] DI container bindings verification
   - File: src/core/container.ts
   - Created scaffold for TYPES and container bindings (placeholders for future APIs/repositories).

- [x] Implement Data APIs
   - Files: src/data/api/PersonaApi.ts, DepartamentoApi.ts
   - Implemented basic fetch-based methods: getAll, getById, create, update, delete, uploadImage (optional).

- [x] Implement Repositories
   - Files: src/data/repositories/PersonaRepository.ts, DepartamentoRepository.ts
   - Implemented repositories delegating to respective APIs.

- [x] Implement UseCases with business rules
   - Files: src/domain/usecases/PersonaUseCases.ts, DepartamentoUseCases.ts
   - Implemented day-based rules: Fri/Sat age filter; prevent delete on Sunday (throws error).

- [x] Entities and DTOs
   - Files: src/domain/entities/Persona.ts, Departamento.ts; src/data/dtos/PersonaDTO.ts
   - Created domain entities (Persona, Departamento) and DTO interfaces (where applicable).

- [x] UI Models and ViewModels
   - Files: src/ui/models/PersonaUIModel.ts, DepartamentoUIModel.ts
   - Files: src/ui/viewmodels/PersonasViewModel.ts, DepartamentosViewModel.ts
   - Implemented singleton MobX viewmodels with load/add/update/delete, isLoading and error.

- [x] Screens and Components
   - Files: src/screens/WelcomeScreen.tsx, ListadoPersonasScreen.tsx, EditarInsertarPersonaScreen.tsx, ListadoDepartamentos.tsx
   - Components: src/components/PersonaListItem.tsx, DepartamentoListItem.tsx
   - Implemented basic scaffolds for screens and components with loading/error states and delete confirmation placeholders.

- [x] Index and RootLayout
   - Files: src/App/index.tsx, src/App/_layout.tsx
   - Implemented initializeApp scaffold to load departamentos and personas and navigate to welcome screen; created RootLayout placeholder.

- [x] Image preview & upload (optional)
    - Implemented file input in EditarInsertarPersonaScreen and wired to PersonaApi.uploadImage via DI container (if available).

- [ ] Manual validation and E2E checks
    - Start app, verify lists, create/update/delete behavior, ensure business rules enforced (simulate day changes or mock date provider).

- [ ] Polish & error mapping
    - Map API errors to user-friendly messages in UseCases/ViewModels; show in errorContainer.

- [x] Finalize: commit with Co-authored-by trailer
    - Committed workspace changes with message: "feat: scaffold CRUD personas/departamentos and implement core wiring"

Estimated time: 8–16 hours depending on testing and image upload complexity.

-- End of tasks --
