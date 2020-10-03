import { createAction, props } from '@ngrx/store';
import ToDo from './todo.model';

export const GetToDoAction = createAction('[ToDo] - Get ToDo');

export const CreateToDoAction = createAction(
  '[ToDo] - Create ToDo',
  props<ToDo>()
);

export const BeginGetToDoAction = createAction('[ToDo] - Begin Get ToDo');

export const SuccessGetToDoAction = createAction(
  '[ToDo] - Success Get ToDo',
  props<{ payload: ToDo[] }>()
);

export const BeginCreateToDoAction = createAction(
  '[ToDo] - Begin Create ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessCreateToDoAction = createAction(
  '[ToDo] - Success Create ToDo',
  props<{ payload: ToDo }>()
);

export const BeginDeleteToDoAction = createAction(
  '[ToDo] - Begin Delete ToDo',
   props<{ payload: ToDo["id"] }>()
);

export const SuccessDeleteToDoAction = createAction(
  '[ToDo] - Success Delete ToDo',
  props<{ payload: ToDo["Title"] }>()
);

export const ErrorToDoAction = createAction('[ToDo] - Error', props<Error>());