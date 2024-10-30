import { TasksService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../src/users/users.service';
export declare class TasksController {
    private readonly tasksService;
    private readonly usersService;
    constructor(tasksService: TasksService, usersService: UsersService);
    createTask(createTaskDto: CreateTaskDto, req: any): Promise<Task>;
    getTasks(req: any): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: number): Promise<void>;
}
