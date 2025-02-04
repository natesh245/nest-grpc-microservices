import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  console.log(join(__dirname, '/todos/protos/todo.proto'));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'todoproto',
        protoPath:
          '/home/latesh/Documents/projects/PHI-SAHI/nestjs-grpc-microservices/dist/todo.proto',
        url: '0.0.0.0:50052',
        loader: {
          enums: String,
          objects: true,
          arrays: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
