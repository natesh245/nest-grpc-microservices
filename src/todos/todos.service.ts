import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity/todo.entity';
import { Repository } from 'typeorm';
import { TodoCreateRequestDto } from './dto/todo-create-request.dto/todo-create-request.dto';
import { TodoUpdateRequestDto } from './dto/todo-update-request.dto/todo-update-request.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(todo: TodoCreateRequestDto): Promise<TodoEntity> {
    let newTodo = new TodoEntity();
    newTodo.name = todo.name;
    newTodo.description = todo.description;

    newTodo = await this.todoRepository.save(newTodo);
    console.log(newTodo);
    return newTodo;
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findOne(uuid: string): Promise<TodoEntity | null> {
    return await this.todoRepository.findOne({ where: { uuid: uuid } });
  }

  async update(todo: TodoUpdateRequestDto): Promise<TodoEntity | null> {
    let todoEntity: TodoEntity | null = await this.todoRepository.findOne({
      where: { uuid: todo.uuid },
    });

    if (!todoEntity) {
      throw new Error('Bad Request');
    }
    todoEntity.name = todo?.name;
    todoEntity.description = todo?.description;

    todoEntity = await this.todoRepository.save(todoEntity);
    return todoEntity;
  }

  async delete(uuid: string): Promise<void> {
    const todo: TodoEntity | null = await this.todoRepository.findOne({
      where: { uuid: uuid },
    });

    if (!todo) {
      throw new Error('Bad Request');
    }
    await this.todoRepository.remove(todo);
  }
}
