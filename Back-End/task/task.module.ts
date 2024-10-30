// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { Task } from './task.entity';
import { UsersModule } from '../src/users/users.module';  // Importa UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,  // Importa UsersModule para usar UsersService
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}