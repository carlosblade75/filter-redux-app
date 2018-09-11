import { Todo } from './todo/models/todo.model';
import { ActionReducerMap } from '@ngrx/store';
import * as fromTodo from './todo/todo.reducer';
import * as filterFilter from './filter/filter.reducer';

import * as filterFilterActions from './filter/filter.actions';

export interface AppState {
    todos: Todo[];
    filtro: filterFilterActions.filtrosValidos;
}

// esta constante es usada en el app module para definir todos los reduces que vamos a usar

export const appReducers: ActionReducerMap<AppState> = {

    // se usa la importación * as from... porque así es más fácil identificar de que tipo es cada reducer. 
    // Pudiera ser que los nombres fueran iguales o parecidos
    todos: fromTodo.todoReducer,
    filtro: filterFilter.FilterReducer
};
