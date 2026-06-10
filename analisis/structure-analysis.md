Análisis de la estructura del proyecto

Resumen
- Arquitectura: Clean Architecture + MVVM.
- Capas: core (DI, BaseApi), data (clientes API, repositorios), domain (entidades, DTOs, casos de uso, interfaces de repositorio), ui (modelos, viewmodels), app (pantallas, layout).

Core (núcleo)
- src/core/BaseApi.ts: URL base centralizada para la API (configurada al endpoint de Azure), getBaseUrl y getDefaultHeaders usados por las APIs.
- src/core/container.ts y src/core/types.ts: contenedor DI (Inversify) y tokens de tipos. Bindings para BaseApi, PersonaApi, DepartamentoApi, repositorios y casos de uso.

Data (capa de datos)
- src/data/api/: PersonaApi.ts, DepartamentoApi.ts — wrappers fetch para /api/Personas y /api/Departamentos. Convierten respuestas a DTOs y exponen uploadImage (opcional).
- src/data/repositories/: PersonaRepository.ts, DepartamentoRepository.ts — implementan las interfaces de repositorio y delegan a las APIs.

Domain (dominio)
- src/domain/entities/: Persona.ts, Departamento.ts — entidades del dominio con getters/setters.
- src/domain/dtos/: PersonaDTO.ts, DepartamentoDTO.ts — definiciones de los DTOs (transporte/API).
- src/domain/interfaces/: IPersonaRepository.ts, IDepartamentoRepository.ts — contratos de repositorio usados por los casos de uso.
- src/domain/usecases/: PersonaUseCases.ts, DepartamentoUseCases.ts — lógica de negocio y reglas:
  - Viernes (5) y Sábado (6): el listado de personas se filtra a las mayores de 18 años.
  - Domingo (0): no está permitido eliminar personas (lanza error).

UI (interfaz)
- src/ui/models/: PersonaUIModel.ts, DepartamentoUIModel.ts — mapeo DTO -> modelo UI, asignación de color e iniciales.
- src/ui/viewmodels/: PersonasViewModel.ts, DepartamentosViewModel.ts — singletons MobX (getInstance), exponen arrays, isLoading, error y métodos CRUD que llaman a los UseCases.

App / Presentación
- src/app/screens/: WelcomeScreen, ListadoPersonasScreen, EditarInsertarPersonaScreen, ListadoDepartamentos — esbozos de pantallas que usan los viewmodels; estados básicos de carga/error, render tipo FlatList, FAB, confirmación de borrado.
- src/App/index.tsx y src/App/_layout.tsx: initializeApp carga departamentos y personas en paralelo y luego navega a WelcomeScreen. _layout es un placeholder para la pila de navegación.
- src/components/: PersonaListItem.tsx, DepartamentoListItem.tsx — avatar/iniciales, detalles y acción de eliminar.

Detalles de implementación y pendientes
- DI: el contenedor enlaza implementaciones concretas; asegurarse de resolver el contenedor antes de su uso. Se actualizó tsconfig para soportar decoradores (experimentalDecorators, emitDecoratorMetadata).
- Manejo de errores: los UseCases lanzan errores descriptivos; los ViewModels los capturan y exponen en .error para que las pantallas muestren errorContainer.
- Subida de imágenes: PersonaApi.uploadImage implementado; EditarInsertarPersonaScreen incluye input de archivo y flujo de subida vía DI.
- Rutas: las pantallas están bajo src/app/screens siguiendo la convención de Expo Router; si se prefiere otra convención de rutas, ajustar paths.

Recomendaciones siguientes
- Añadir tests unitarios para los UseCases que verifiquen las reglas de negocio (filtro por edad y prohibición de borrado).
- Mejorar el mapeo de errores: mapear códigos HTTP a mensajes de usuario (ErrorMapper en UseCases o ViewModels).
- Añadir validación de formularios y tests para EditarInsertarPersonaScreen.
- Documentar el contrato de la API (forma esperada de los DTOs) y confirmar la existencia y comportamiento del endpoint upload-image.

Ubicación
- Este análisis está guardado en analisis/structure-analysis.md en la raíz del repositorio.
