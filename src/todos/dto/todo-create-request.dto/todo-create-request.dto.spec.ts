import { TodoCreateRequestDto } from './todo-create-request.dto';

describe('TodoCreateRequestDto', () => {
  it('should be defined', () => {
    expect(new TodoCreateRequestDto()).toBeDefined();
  });
});
