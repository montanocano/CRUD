import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';
import { BaseApi } from './BaseApi';
import { PersonaApi } from '../data/api/PersonaApi';
import { DepartamentoApi } from '../data/api/DepartamentoApi';
import { PersonaRepository } from '../data/repositories/PersonaRepository';
import { DepartamentoRepository } from '../data/repositories/DepartamentoRepository';
import { PersonaUseCases } from '../domain/usecases/PersonaUseCases';
import { DepartamentoUseCases } from '../domain/usecases/DepartamentoUseCases';

const container = new Container();

// Core
container.bind<BaseApi>(TYPES.BaseApi).to(BaseApi).inSingletonScope();

// APIs
container.bind<PersonaApi>(TYPES.PersonaApi).to(PersonaApi).inSingletonScope();
container.bind<DepartamentoApi>(TYPES.DepartamentoApi).to(DepartamentoApi).inSingletonScope();

// Repositories
container.bind<PersonaRepository>(TYPES.PersonaRepository).to(PersonaRepository).inSingletonScope();
container.bind<DepartamentoRepository>(TYPES.DepartamentoRepository).to(DepartamentoRepository).inSingletonScope();

// UseCases
container.bind<PersonaUseCases>(TYPES.PersonaUseCases).to(PersonaUseCases).inSingletonScope();
container.bind<DepartamentoUseCases>(TYPES.DepartamentoUseCases).to(DepartamentoUseCases).inSingletonScope();

export default container;
