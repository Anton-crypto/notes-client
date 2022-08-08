import { Todo } from "./todo.model";
import { Type } from 'class-transformer';

export class Category {
  id?: any;
  title?: number;

  @Type(() => Todo)
  todos: Todo[] | undefined
}
