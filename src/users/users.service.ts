import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@Inject('APP_NAME') private appName: string) {
    console.log(`UserService initialized for ${this.appName}`);
  }

  private users: UserEntity[] = [];

  findAllUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserEntity | undefined {
    return this.users.find((user: UserEntity) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      ...createUserDto,
      id: uuidv7(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
    // Find the element index that we want to update
    const userIndex = this.users.findIndex(
      (user: UserEntity) => user.id === id,
    );

    // Update the element
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex(
      (user: UserEntity) => user.id === id,
    );

    if (userIndex === -1) {
      return;
    }

    this.users.splice(userIndex, 1);
  }
}
