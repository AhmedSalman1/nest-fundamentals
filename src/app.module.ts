import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './users/users.module.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';

@Module({
  imports: [UserModule],
  providers: [
    // CustomLoggerService

    // 1. Logging first
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },

    // 2. Serializer second
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
