import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransFormationInterceptor } from './response.interface';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new TransFormationInterceptor());

  await app.listen(process.env.port, () => {
    return logger.log(`Server running on port ${process.env.port}`);
  });
}
bootstrap();
