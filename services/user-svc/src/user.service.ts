import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../../libs/shared-dtos/dist/index';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    // TODO: Implement user creation logic
    throw new Error('Method not implemented.');
  }

  async findOne(id: string): Promise<UserDto> {
    // TODO: Implement find user logic
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    // TODO: Implement update user logic
    throw new Error('Method not implemented.');
  }

  async remove(id: string): Promise<void> {
    // TODO: Implement delete user logic
    throw new Error('Method not implemented.');
  }
}
