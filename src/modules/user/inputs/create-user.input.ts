import { Role } from '../dto/Role';

export type CreateUserInput = {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  picture?: string;
  role: Role;
};
