import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
