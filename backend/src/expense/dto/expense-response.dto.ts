import { Category } from 'src/category/entity/category.entity';

export class ExpneseResponseDto {
  eid: number;
  title: string;
  amount: number;
  timestamp: Date;
  category: Category;

  constructor(partial: Partial<ExpneseResponseDto>) {
    Object.assign(this, partial);
  }
}
