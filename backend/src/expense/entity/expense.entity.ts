import { Category } from 'src/category/entity/category.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  eid: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @JoinColumn({ name: 'uuid' })
  @ManyToOne(() => Users, (user) => user.expenses)
  user: Users;

  @JoinColumn({ name: 'cid' })
  @ManyToOne(() => Category, (category) => category.expenses)
  category: Category;

  @CreateDateColumn()
  timestamp: Date;
}
