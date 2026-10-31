import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module.js';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
