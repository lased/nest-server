import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [
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
