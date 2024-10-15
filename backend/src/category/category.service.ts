import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  onApplicationBootstrap(): void {
    const categories = [
      {
        cid: 1,
        name: 'Food',
        color: '4ade80',
      },
      {
        cid: 2,
        name: 'Transport',
        color: 'A1FE4A',
      },
      {
        cid: 3,
        name: 'Entertainment',
        color: '0495D3',
      },
    ];
    categories.forEach(async (category) => {
      const isExist = await this.categoryRepository.findOne({
        where: { cid: category.cid },
      });
      if (!isExist) {
        const newCategory = this.categoryRepository.create({
          name: category.name,
          color: category.color,
        });
        this.categoryRepository.insert(newCategory);
      }
    });
  }

  async findOne(cid: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { cid: cid } });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
