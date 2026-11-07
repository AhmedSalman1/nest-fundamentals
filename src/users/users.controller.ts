import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { UserEntity } from './user.entity.js';
import { UserService } from './users.service.js';
import { UserResponseDto } from './dtos/user-response.dto.js';
import type { Request } from 'express';
import { Public } from '../common/decorators/public.decorator.js';

@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async findAll(@Req() req: Request): Promise<UserEntity[]> {
    return this.userService.findAllUsers();
  }

  @Public()
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDto | undefined {
    return this.userService.findUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.userService.deleteUser(id);
  }
}
