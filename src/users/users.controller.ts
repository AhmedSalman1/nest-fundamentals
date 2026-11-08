import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
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
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  EMAIL: string;
  API_BASE_URL: string;
}

@Controller('Users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
  ) {
    console.log(this.configService.get('EMAIL', { infer: true }));
    console.log(this.configService.get('API_BASE_URL', { infer: true }));
  }

  @Public()
  @Get()
  async findAll(@Req() req: Request): Promise<UserEntity[]> {
    this.logger.log('Attempting to fetch all users...');
    this.logger.warn('Database connection is running slow...');
    this.logger.error('Failed to fetch users!', 'Stack trace details here');

    const users = await this.userService.findAllUsers();

    this.logger.debug(`Found ${users.length} users`);
    console.log(`Found ${users.length} users`);

    return users;
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
