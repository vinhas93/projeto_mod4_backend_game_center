import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Game Center')
    .setDescription(
      'Aplicação para gestão dos Jogos de cada usuário. \n\nCrie seu usuário, compartilhe sua conta com diferentes perfis. Cada perfil pode gerar sua própria lista de jogos e jogos favoritos. \n\nÉ necessário ser admin para acrescentar novos jogos.',
    )
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('Login')
    .addTag('create-user')
    .addTag('user-admin')
    .addTag('game-genre')
    .addTag('game')
    .addTag('user-my-account')
    .addTag('user-profile')
    .addTag('games-from-profile')
    .addTag('homepage')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
