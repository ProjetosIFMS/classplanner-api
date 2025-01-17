import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUsersUseCase,
  FindUserByEmailUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
} from './use-cases';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserAreaUseCase } from './use-cases/update-user-area.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly updateUserAreaUseCase: UpdateUserAreaUseCase,
  ) {}
  async createUser(data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }

  async FindUserByEmail(email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }

  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }

  async findUserById(id: string) {
    return await this.findUserByIdUseCase.execute(id);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return await this.updateUserUseCase.execute(id, data);
  }

  async deleteUser(id: string) {
    return await this.deleteUserUseCase.execute(id);
  }

  async updateUserArea(userId: string, role: string, area_id: string) {
    return await this.updateUserAreaUseCase.execute(userId, role, area_id);
  }
}
