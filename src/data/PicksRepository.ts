import type { Pick } from '../domain/pick';

export interface PicksRepository {
  getAll(): Promise<Pick[]>;
}