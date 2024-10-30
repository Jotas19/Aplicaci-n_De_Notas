// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../task/task.module';
import { Task } from '../task/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';  
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tasks.db',
      entities: [User, Task],
      synchronize: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
