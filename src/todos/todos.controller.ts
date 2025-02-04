import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TodosService } from './todos.service';
import { TodoEntity } from './entity/todo.entity/todo.entity';

@Controller('todoproto')
export class TodosController {
  constructor(private readonly todoServices: TodosService) {}
  @GrpcMethod('TodoService', 'getTodos')
  async getTodos() {
    const todos = await this.todoServices.findAll();
    return { todos };
  }

  @GrpcMethod('TodoService', 'getTodoById')
  async getTodoById(data: { uuid: string }) {
    return await this.todoServices.findOne(data?.uuid);
  }

  @GrpcMethod('TodoService', 'createTodo')
  async createTodo(data: { name: string; description: string }) {
    const newTodo: TodoEntity = await this.todoServices.createTodo(data);
    return newTodo;
  }

  @GrpcMethod('TodoService', 'updateTodo')
  async updateTodo(data: { uuid: string; name: string; description: string }) {
    return await this.todoServices.update(data);
  }

  @GrpcMethod('TodoService', 'deleteTodo')
  async deleteTodo(data: { uuid: string }) {
    console.log(data);
    await this.todoServices.delete(data?.uuid);
    return { message: 'successfully deleted' };
  }
}
