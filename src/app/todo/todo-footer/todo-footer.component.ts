import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as fromFilter from '../../filter/filter.actions';

import { LimpiarCompletadosTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosvalidos: fromFilter.filtrosValidos[] = [ 'Todos', 'Pendientes', 'Completados'];

  filtroSelected = 'Todos';

  constructor(private store: Store<AppState> ) { }

  ngOnInit() {

    this.store.subscribe( state => {

      this.pendientes = state.todos.filter ( item => item.completado === false).length;

      this.filtroSelected = state.filtro;
    });
  }

  setFiltro(filtro: fromFilter.filtrosValidos) {

    const action = new fromFilter.SetFiltroAction( filtro );

    this.store.dispatch( action );
  }

  limpiarCompletados() {

    const action = new LimpiarCompletadosTodoAction();

    this.store.dispatch( action );
  }

}
