import * as fromTodo from './todo.actions';
import { Todo } from './models/todo.model';

const todo1: Todo = new Todo('Derrotar a Thanos');
const todo2: Todo = new Todo('Salvar al mundo');
const todo3: Todo = new Todo('Pedir trabaje capitán america');

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer (state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch ( action.type ) {

        case fromTodo.AGREGAR_TODO:

            const newTodo = new Todo(action.texto);
            // operador spread de emac v6. Clona el array
            return [...state, newTodo];

        case fromTodo.TOGGLE_TODO:

           // el operador map crea un nuevo objeto
           return state.map(  todoEdit => {

            if (todoEdit.id === action.id) {

                // el operador spread pone todas las propiedades del objeto excepto las que se vayan a cambiar
                return {
                    ...todoEdit,
                    completado: !todoEdit.completado
                };
            } else {
                return todoEdit;
            }

           });

        case fromTodo.EDITAR_TODO:

               // el operador map crea un nuevo objeto
            return state.map(  todoEdit => {

                if (todoEdit.id === action.id) {

                    // el operador spread pone todas las propiedades del objeto excepto las que se vayan a cambiar
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }

           });

        case fromTodo.BORRAR_TODO:

               // el operador FILTER crea un nuevo ARRAY pero clonando los objetos
               return state.filter(  todoEdit => todoEdit.id !== action.id );

        case fromTodo.TOGGLE_ALL_TODO:

               // el operador map crea un nuevo objeto
            return state.map(  todoEdit => {
               // el operador spread pone todas las propiedades del objeto excepto las que se vayan a cambiar
                return {
                    ...todoEdit,
                    completado: action.completado
                };

           });

        case fromTodo.LIMPIAR_COMPLETADOS_TODO:

               // el operador map crea un nuevo objeto
            return state.map(  todoEdit => {
               // el operador spread pone todas las propiedades del objeto excepto las que se vayan a cambiar
                return {
                    ...todoEdit,
                    completado: false
                };

       });

        default:

            return state;
    }
}