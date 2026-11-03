import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './users/users.module.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { WrapDataInterceptor } from './common/interceptors/wrap-data.interceptor.js';

@Module({
  imports: [UserModule],
  providers: [
    // CustomLoggerService

    // 1. Logging first
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },

    // 2. WrapData second
    { provide: APP_INTERCEPTOR, useClass: WrapDataInterceptor },

    // 3. Serializer third
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
