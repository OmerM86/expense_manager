import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly expenseRepository: Repository<Category>,
  ) {}

  async findOne(cid: number): Promise<Category> {
    return await this.expenseRepository.findOne({ where: { cid: cid } });
  }

  async findAll(): Promise<Category[]> {
    return await this.expenseRepository.find();
  }
}
