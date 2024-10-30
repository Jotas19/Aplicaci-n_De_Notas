// tasks/task.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async createTask(taskData: CreateTaskDto & { userId: number }): Promise<Task> {
        const task = this.tasksRepository.create({ ...taskData, userId: taskData.userId });  // Asegúrate de que userId se guarde
        return this.tasksRepository.save(task);
    }

    async getTasksByUserId(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({ where: { userId } }); 
    }

    async getTaskById(id: number): Promise<Task> {
        return this.tasksRepository.findOneBy({ id });
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        await this.tasksRepository.update(id, updateTaskDto);
        return this.getTaskById(id);
    }

    async deleteTask(id: number): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}