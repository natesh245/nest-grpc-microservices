import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('todoproto')
export class TodosController {
  @GrpcMethod('TodoService', 'getTodos')
  getTodos() {
    return {
      todos: [
        {
          uuid: 1,
          name: 'John',
          descriptions: 'test',
        },
        {
          uuid: 2,
          name: 'Roger',
          description: 'test 2',
        },
      ],
    };
  }

  @GrpcMethod('TodoService', 'getTodoById')
  getTodoById(data: { uuid: number }) {
    return {
      uuid: data.uuid,
      name: 'test' + data.uuid,
      description: 'test description' + data.uuid,
    };
  }

  @GrpcMethod('TodoService', 'createTodo')
  createTodo(data: { name: string; description: string }) {
    return {
      uuid: Math.random() * 10,
      name: data?.name,
      description: data?.description + ' new TODO created',
    };
  }

  @GrpcMethod('TodoService', 'updateTodo')
  updateTodo(data: { uuid: number; name: string; description: string }) {
    return {
      uuid: data?.uuid,
      name: data?.name + ' updated',
      description: data?.description + ' updated TODO',
    };
  }

  @GrpcMethod('TodoService', 'deleteTodo')
  deleteTodo(data: { uuid: number }) {
    return {
      uuid: data?.uuid,
      name: 'delete TODO name ' + data?.uuid,
      description: 'deleted RODO description ' + data?.uuid,
    };
  }
}
