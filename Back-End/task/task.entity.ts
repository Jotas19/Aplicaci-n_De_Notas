// tasks/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', nullable: true })
  dueDate: Date;

  @Column({ type: 'text', default: 'Pendiente' })
  status: string;

  @Column({default: 0})
  userId: number; 
}
