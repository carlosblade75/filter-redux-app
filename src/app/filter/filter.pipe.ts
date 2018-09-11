import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/models/todo.model';
import * as fromFilterValidos from './filter.actions';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filtro: fromFilterValidos.filtrosValidos): Todo[] {

    switch ( filtro ) {
      case 'Todos':
        return todos;
      case 'Pendientes':
        return todos.filter( todo => !todo.completado );
      case 'Completados':
        return todos.filter( todo => todo.completado );
      default:
        return todos;
    }
  }

}
