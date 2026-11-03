import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { v7 as uuidv7 } from 'uuid';
import { ConfigService } from './config.service.js';
import { UserResponseDto } from './dtos/user-response.dto.js';
import { CustomHttpException } from '../common/exceptions/custom-http.exception.js';

@Injectable()
export class UserService {
  constructor(
    @Inject('APP_NAME') private appName: string,
    private readonly configService: ConfigService,
    @Inject('USER_HABITS') private userHabits: string[],
    @Inject('CONFIG') private config: string,
  ) {
    // console.log(`UserService initialized for ${this.appName}`);
    // console.log(
    //   `ConfigService initialized with config: ${this.configService.constructor.name}`,
    // );
    // console.log(`User habits: ${this.userHabits.join(', ')}`);
    // console.log(`Config: ${this.config}`);
  }

  private users: UserEntity[] = [];

  findAllUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserResponseDto {
    const user = this.users.find((user: UserEntity) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
      // throw new CustomHttpException();
    }

    return new UserResponseDto(user);
  }

  createUser(createUserDto: CreateUserDto): UserResponseDto {
    const newUser: UserEntity = {
      ...createUserDto,
      id: uuidv7(),
    };
    this.users.push(newUser);

    return new UserResponseDto(newUser);
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
