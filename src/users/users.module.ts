import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UserService } from './users.service.js';
import { APP_NAME, USER_HABITS } from './user.constants.js';
import {
  ConfigService,
  DevelopmentConfigService,
  ProductionConfigService,
} from './config.service.js';

const mockUserService = {
  // mock implementation
  findAllUsers() {
    return ['user1', 'user2'];
  },
};

@Injectable()
class UserHabitsFactory {
  getHabits() {
    return ['exercise', 'reading', 'coding'];
  }
}

@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerServiceAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  controllers: [UsersController],
  providers: [
    //! Standard provider
    UserService,
    UserHabitsFactory,

    LoggerService,
    loggerServiceAliasProvider,

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

    //* 3. class based provider
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'production'
          ? ProductionConfigService
          : DevelopmentConfigService,
    },

    //* 4. factory based provider
    {
      provide: USER_HABITS,
      useFactory: (userHabits: UserHabitsFactory) => userHabits.getHabits(),
      inject: [UserHabitsFactory],
    },
  ],
  exports: [USER_HABITS]
})
export class UserModule {}
