import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard, Permissions } from '../auth/auth.guard';
import { TodoPermission } from './todos.permission';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @Permissions(TodoPermission.CREATE_TODO)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @Permissions(TodoPermission.READ_TODO)
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @Permissions(TodoPermission.READ_TODO)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(TodoPermission.UPDATE_TODO)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @Permissions(TodoPermission.DELETE_TODO)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
