import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para que tu app móvil pueda conectarse desde "fuera"
  app.enableCors();

  // IMPORTANTE: Usar process.env.PORT
  // El '0.0.0.0' es vital para que Docker exponga la red correctamente
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
