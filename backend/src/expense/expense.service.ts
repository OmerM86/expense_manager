import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entity/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseDto } from './dto/expense.dto';
import { UsersService } from 'src/users/users.service';
import { CategoryService } from 'src/category/category.service';
import { ExpneseResponseDto } from './dto/expense-response.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly userService: UsersService,
    private readonly categoryService: CategoryService,
  ) {}

  // find one related to the user and the specified expense id
  async findOne(uuid: number, eid: number): Promise<Expense> {
    return await this.expenseRepository.findOne({
      relations: ['category'],
      where: { user: { uuid: uuid }, eid: eid },
    });
  }

  // find all related to the user
  async findAll(uuid: number): Promise<Expense[]> {
    return await this.expenseRepository.find({
      relations: ['category'],
      where: { user: { uuid: uuid } },
    });
  }

  async create(
    uuid: number,
    expenseDto: ExpenseDto,
  ): Promise<ExpneseResponseDto> {
    const { password, ...user } = await this.userService.findOne(uuid);
    const category = await this.categoryService.findOne(expenseDto.cid);
    const expense = this.expenseRepository.create({
      title: expenseDto.title,
      amount: expenseDto.amount,
      user: user,
      category: category,
      timestamp: new Date(expenseDto.timestamp),
    });

    try {
      const expenseinfo = await this.expenseRepository.save(expense);
      const { user, ...response } = expenseinfo;

      return new ExpneseResponseDto(response);
    } catch {
      throw new InternalServerErrorException({
        message: ['failed to create expense'],
        error: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(
    uuid: number,
    eid: number,
    expenseDto: ExpenseDto,
  ): Promise<ExpneseResponseDto> {
    const expense = await this.expenseRepository.findOneBy({
      user: { uuid: uuid },
      eid: eid,
    });

    if (expense) {
      const category = await this.categoryService.findOne(expenseDto.cid);

      try {
        const response = await this.expenseRepository.save({
          eid: eid,
          title: expenseDto.title,
          amount: expenseDto.amount,
          category: category,
          timestamp: new Date(expenseDto.timestamp),
        });
        return new ExpneseResponseDto(response);
      } catch {
        throw new InternalServerErrorException({
          message: ['failed to update expense'],
          error: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  async remove(uuid: number, eid: number): Promise<ExpneseResponseDto> {
    const expense = await this.expenseRepository.findOneBy({
      user: { uuid: uuid },
      eid: eid,
    });

    if (expense) {
      try {
        const expenseinfo = await this.expenseRepository.remove(expense);
        const { user, ...response } = expenseinfo;
        return new ExpneseResponseDto(response);
      } catch {
        throw new InternalServerErrorException({
          message: ['failed to remove expense'],
          error: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
