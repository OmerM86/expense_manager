import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from '@nestjs/passport';
import { ExpenseDto } from './dto/expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req, @Body() expenseDto: ExpenseDto) {
    return this.expenseService.create(req.user.uuid, expenseDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return this.expenseService.findAll(req.user.uuid);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req, @Param('id') id: string) {
    return this.expenseService.findOne(req.user.uuid, Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req, @Param('id') id: string, @Body() expenseDto: ExpenseDto) {
    return this.expenseService.update(req.user.uuid, Number(id), expenseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req, @Param('id') id: string) {
    return this.expenseService.remove(req.user.uuid, Number(id));
  }
}
