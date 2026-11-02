import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UserService } from './users.service.js';
import { APP_NAME } from './user.constants.js';

const mockUserService = {
  // mock implementation
  findAllUsers() {
    return ['user1', 'user2'];
  },
};

@Module({
  controllers: [UsersController],
  providers: [
    //! Standard provider
    UserService,

    //! Custom provider
    //* 1. value based provider
    // {
    //   provide: UserService,
    //   useValue: mockUserService,
    // },

    //* 2. non-class based provider
    {
      provide: APP_NAME,
      useValue: 'Nest Demo API',
    },

    //* class based provider

    //* factory based provider
  ],
})
export class UserModule {}
