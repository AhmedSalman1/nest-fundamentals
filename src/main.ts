import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
// import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { WrapDataInterceptor } from './common/interceptors/wrap-data.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // @ Apply ValidationPipe globally to all incoming requests.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // @ Apply LoggingInterceptor globally to all incoming requests.
  // ! We need DI, so we move it to AppModule.
  // app.useGlobalInterceptors(new LoggingInterceptor());

  // @ Apply WrapDataInterceptor globally to all incoming requests, No need to DI.
  app.useGlobalInterceptors(new WrapDataInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
