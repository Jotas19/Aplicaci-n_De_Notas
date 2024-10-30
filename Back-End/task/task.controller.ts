/* tasks/tasks.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete, Request } from '@nestjs/common'; // Asegúrate de importar Request
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { TasksService } from '../task/task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../src/users/users.service'; // Importar UsersService

@Controller('tasks')
@UseGuards(JwtAuthGuard)  
export class TasksController {

    constructor(private readonly tasksService: TasksService, private readonly usersService: UsersService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
      return this.tasksService.createTask({ ...createTaskDto, userId: req.user.id }); // Agregar el userId
    }
  
    @Get()
    async getTasks(@Request() req: any): Promise<Task[]> { // Añadir el tipo 'any' o definir una interfaz
        // Obtener las tareas del usuario autenticado
        return this.tasksService.getTasksByUserId(req.user.id); // Asegúrate de que req.user.id esté definido
    }
    
    @Get(':id')
    async getTaskById(@Param('id') id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }
  
    @Put(':id')
    async updateTask(
      @Param('id') id: number, 
      @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task> {
      return this.tasksService.updateTask(
        id, 
        updateTaskDto // Ahora solo pasa el DTO
      );
    }
  
    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void> {
      return this.tasksService.deleteTask(id);
    }
}
*/

// tasks/tasks.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { TasksService } from './task.service'; // Ajusta la ruta
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../src/users/users.service'; // Asegúrate de que esta ruta sea correcta

@Controller('tasks')
@UseGuards(JwtAuthGuard)  
export class TasksController {

    constructor(private readonly tasksService: TasksService, private readonly usersService: UsersService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
      const userId = req.user.id; // Obtiene el ID del usuario autenticado
      return this.tasksService.createTask({ ...createTaskDto, userId }); // Agregar el userId
    }
  
    @Get()
    async getTasks(@Request() req: any): Promise<Task[]> {
        const userId = req.user.id; // Obtiene el ID del usuario autenticado
        return this.tasksService.getTasksByUserId(userId); // Obtener tareas por ID de usuario
    }
    
    @Get(':id')
    async getTaskById(@Param('id') id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }
  
    @Put(':id')
    async updateTask(
      @Param('id') id: number, 
      @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task> {
      return this.tasksService.updateTask(id, updateTaskDto);
    }
  
    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void> {
      return this.tasksService.deleteTask(id);
    }
}