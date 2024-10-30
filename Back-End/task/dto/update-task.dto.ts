// tasks/dto/update-task.dto.ts
export class UpdateTaskDto {
  title: string; 
  description: string; 
  dueDate: Date; 
  status: string; // Agrega el estado de la tarea
}
