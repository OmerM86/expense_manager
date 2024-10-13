import { Expense } from 'src/expense/entity/expense.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  name: string;

  @Column({ type: 'char', length: 6 })
  color: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
