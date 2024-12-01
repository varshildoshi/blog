import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.enableCors();
  app.enableCors({
    origin: ['http://localhost:3000/', 'https://blog-web.up.railway.app/'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  }); 
  await app.listen(port, "0.0.0.0");
  // await app.listen(3000);
}
bootstrap();
