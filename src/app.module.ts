import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './users/users.module.js';
import { CommonModule } from './common/common.module.js';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import ormConfig from './config/orm.config.js';
// import ormConfigProd from './config/orm.config.prod.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.staging',

      // load: [ormConfig, ormConfigProd],
      // ignoreEnvFile: true,
    }),

    // TypeOrmModule.forRootAsync({
    //   useFactory:
    //     process.env.NODE_ENV === 'development' ? ormConfig : ormConfigProd,
    // }),
    UserModule,
    CommonModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
