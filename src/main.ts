import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');

  // app.use((req, res, next) => {
  //   console.log(`Incoming request: ${req.method} ${req.path}`); // Логируем запрос
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  //     res.header(
  //       'Access-Control-Allow-Methods',
  //       'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  //     );
  //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //     res.header('Access-Control-Allow-Credentials', 'true');
  //     return res.sendStatus(204); // Без тела
  //   }
  //   next();
  // });

  // app.enableCors({
  //   origin: ['http://localhost:3000', 'http://217.114.12.78'],
  //   credentials: true,
  //   methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });

  // await app.listen(process.env.PORT ?? 3000);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
