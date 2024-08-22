import { User } from './entities/user.entity';

export interface IUserService {
  create(data: Omit<User, 'id'>): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User>;
  remove(id: string): Promise<User>;
}
