import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './users/users.module.js';
import { CommonModule } from './common/common.module.js';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UserModule, CommonModule],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
