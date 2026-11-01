import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { UserEntity } from './user.entity.js';
import { v7 as uuidv7 } from 'uuid';

@Controller('Users')
export class UsersController {
  private users: UserEntity[] = [];

  @Get()
  findAll(): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity | undefined {
    // console.log(typeof id);
    return this.users.find((user: UserEntity) => user.id === id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const newUser: UserEntity = {
      ...createUserDto,
      id: uuidv7(),
    };
    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
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

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const userIndex = this.users.findIndex(
      (user: UserEntity) => user.id === id,
    );

    if (userIndex === -1) {
      return;
    }

    this.users.splice(userIndex, 1);
  }
}
