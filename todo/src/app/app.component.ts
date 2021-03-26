import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
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

    this.load();

    /*this.todos.push(new Todo(1,'Limpar a cozinha', false));
    this.todos.push(new Todo(2,'Tirar o lixo', false));
    this.todos.push(new Todo(3,'Cortar o cabelo', true));*/
    
    /*this.todos.push('Tirar o lixo');
    this.todos.push('Cortar o cabelo');*/
  }

  add(){
    //this.form.value => { title: 'Titulo' }
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index,1);
    }
    this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(){
    const data = localStorage.getItem('todos');
    if(data){
      this.todos = JSON.parse(data);
    }
    else{
      this.todos = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }

  /*alteraTexto(){
    this.title = 'Teste';
  }*/
}
