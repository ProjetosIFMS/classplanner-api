import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './guards/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Class Planner IFMS')
    .setDescription('Projeto de Pesquisa Científica')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
