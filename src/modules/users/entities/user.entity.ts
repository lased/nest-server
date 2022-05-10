import Permission from 'src/permission';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'set',
    enum: Permission, // Max count 64 / 4 = 16 endpoints
    default: [],
  })
  permissions: Permission[];
}
