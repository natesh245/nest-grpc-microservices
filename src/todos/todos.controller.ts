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
}
