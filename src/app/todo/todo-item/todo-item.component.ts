import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  editando: boolean ;
  chkField: FormControl;
  txtInput: FormControl;

  @Input() todo: Todo;
  @ViewChild('txtInpurFisico') txtInpurFisico: ElementRef;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.chkField = new FormControl( this.todo.completado);
    this.txtInput = new FormControl( this.todo.texto, Validators.required);

    this.chkField.valueChanges.subscribe( () => {

      const action = new ToggleTodoAction( this.todo.id);

      this.store.dispatch( action );
    });

  }

  editar() {

    this.editando = true;
    setTimeout( () => {
      this.txtInpurFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion() {

    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    // console.log(this.txtInput.value.length);
    if (this.txtInput.value.length > 0) {

      const action = new EditarTodoAction( this.todo.id, this.txtInput.value);

      this.store.dispatch( action );

    }

  }

  borrarItem() {

    const action = new BorrarTodoAction( this.todo.id);

    this.store.dispatch( action );
    
  }

}
