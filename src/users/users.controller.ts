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
  // UseFilters,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { UserEntity } from './user.entity.js';
import { UserService } from './users.service.js';
import { UserResponseDto } from './dtos/user-response.dto.js';
import type { Request } from 'express';
// import { CustomExceptionFilter } from '../common/filters/custom-exception.filter.js';

@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<UserEntity[]> {
    // delay 5 seconds
    console.log(req.body);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDto | undefined {
    return this.userService.findUserById(id);
  }

  @Post()
  // @UseFilters(new CustomExceptionFilter())
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    // throw new ForbiddenException();
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
