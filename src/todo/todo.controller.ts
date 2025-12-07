import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * @param id
   * @returns Todo
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  /**
   * @param date
   * @returns Todo[]
   */
  @Get()
  findAll(@Query('date') date: string): Promise<Todo[]> {
    try {
      return this.todoService.findAll(date);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param id
   * @param updateTodoDto
   * @returns Todo
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }
}
