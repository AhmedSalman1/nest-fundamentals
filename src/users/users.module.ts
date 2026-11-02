import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UserService } from './users.service.js';
import { APP_NAME, CONFIG, USER_HABITS } from './user.constants.js';
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

const configFactory = {
  provide: CONFIG,
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? 'devConfig' : 'prodConfig';
  },
};

// Asynchronous providers
class DatabaseConnection {
  async connectToDB(): Promise<string> {
    return await Promise.resolve('Connected to DB successfully');
  }
}

@Module({
  controllers: [UsersController],
  providers: [
    //! Standard provider
    UserService,
    UserHabitsFactory,

    LoggerService,
    loggerServiceAliasProvider,

    DatabaseConnection,

    configFactory,

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

    //* 4. factory based provider + async factory based provider
    {
      provide: USER_HABITS,
      useFactory: async (
        userHabits: UserHabitsFactory,
        dbConnection: DatabaseConnection,
      ) => {
        const dbStatus = await dbConnection.connectToDB();

        console.log(dbStatus);
        return userHabits.getHabits();
      },
      inject: [UserHabitsFactory, DatabaseConnection],
    },
  ],
  exports: [USER_HABITS],
})
export class UserModule {}
