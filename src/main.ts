import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Game Center')
    .setDescription(
      'Aplicação para gestão dos Jogos de cada usuário. \n\nCrie seu usuário, compartilhe sua conta com diferentes perfis. Cada perfil pode gerar sua própria lista de jogos e jogos favoritos. \n\nÉ necessário ser admin para acrescentar novos jogos.',
    )
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('user')
    .addTag('profile')
    .addTag('homepage')
    .addTag('game')
    .addTag('genre')
    .addTag('games-Profile')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
