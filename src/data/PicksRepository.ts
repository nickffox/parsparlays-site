import { Pick } from '../domain/Pick';

export interface PicksRepository {
  getAll(): Promise<Pick[]>;
}