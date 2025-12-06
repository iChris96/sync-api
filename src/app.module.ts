import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // Makes .env variables available via ConfigService
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TodoModule,
  ],
})
export class AppModule {}
