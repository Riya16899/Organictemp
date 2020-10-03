

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../todo.action';
import ToDo from '../todo.model';
import ToDoState from '../todo.state';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  constructor(private store: Store<{ todos: ToDoState }>, private http: HttpClient) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Title: string = '';
  IsCompleted: boolean = false;
  Text: string = '';
  Id: number;

  todoError: Error = null;

  createToDo() {
    const todo: ToDo = { id: this.Id, Title: this.Title, Text: this.Text, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.Title = '';
    this.Text = '';
    this.IsCompleted = false;
  }

  deleteToDo(id: number) {
  	console.log('delete button clicked');
  	console.log(id);
  	// const todo: ToDo = { Title: this.Title, Text: this.Text, IsCompleted: this.IsCompleted };
  	const T: number = id;
    this.store.dispatch(ToDoActions.BeginDeleteToDoAction({ payload: T} ));
    this.Title = '';
    this.Text = '';
    this.IsCompleted = false;
    this.ngOnInit();
  
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}