import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = []; //Vazio
  //public todos: any[] = []; //Vazio
  public title: String = 'Minhas tarefas'
  //public todos: any[]; //Undefined
  public form: FormGroup;

  //ctor
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.todos.push(new Todo(1,'Limpar a cozinha', false));
    this.todos.push(new Todo(2,'Tirar o lixo', false));
    this.todos.push(new Todo(3,'Cortar o cabelo', true));
    
    /*this.todos.push('Tirar o lixo');
    this.todos.push('Cortar o cabelo');*/
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index,1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true;
  }

  markAsUndone(todo: Todo){
    todo.done = false;
  }

  /*alteraTexto(){
    this.title = 'Teste';
  }*/
}
