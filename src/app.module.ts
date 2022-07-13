import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { TodosModule } from './resources/todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? '.env' : '.env.local',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
