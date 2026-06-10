import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';
import { BaseApi } from './BaseApi';

// NOTE: The concrete implementations (PersonaApi, DepartamentoApi, repositories, usecases)
// are expected to be created under src/data and src/domain. These bindings are a scaffold
// and should be completed when those classes are implemented.

const container = new Container();

// Core
container.bind<BaseApi>(TYPES.BaseApi).to(BaseApi).inSingletonScope();

// The following bindings are placeholders and assume the corresponding classes exist.
// Uncomment and adjust imports when implementations are added.

import { PersonaApi } from '../data/api/PersonaApi';
import { DepartamentoApi } from '../data/api/DepartamentoApi';
import { PersonaRepository } from '../data/repositories/PersonaRepository';
import { DepartamentoRepository } from '../data/repositories/DepartamentoRepository';
import { PersonaUseCases } from '../domain/usecases/PersonaUseCases';
import { DepartamentoUseCases } from '../domain/usecases/DepartamentoUseCases';

// Bind concrete implementations
container.bind(TYPES.PersonaApi).to(PersonaApi).inSingletonScope();
container.bind(TYPES.DepartamentoApi).to(DepartamentoApi).inSingletonScope();
container.bind(TYPES.PersonaRepository).to(PersonaRepository).inSingletonScope();
container.bind(TYPES.DepartamentoRepository).to(DepartamentoRepository).inSingletonScope();
container.bind(TYPES.PersonaUseCases).to(PersonaUseCases).inSingletonScope();
container.bind(TYPES.DepartamentoUseCases).to(DepartamentoUseCases).inSingletonScope();


export default container;
