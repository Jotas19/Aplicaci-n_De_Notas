// tasks/dto/create-task.dto.ts
export class CreateTaskDto {
  title: string;
  description: string;
  dueDate?: Date;
  status?: string; // Agrega el estado de la tarea 
  userId: number;
}
