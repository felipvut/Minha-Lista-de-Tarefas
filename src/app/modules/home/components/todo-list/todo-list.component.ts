import { Component, DoCheck } from '@angular/core';
import { takeLast } from 'rxjs';

 //Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck{
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() {}

  ngDoCheck(): void {

    this.setLocalStorage()
  }

  public setEmitTaskList(event: string){
    let obj = {task: event, checked: false}
    this.taskList.push(obj)
    console.log(event)
  }
  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1)
  }

  public deleteAllTaskList() {
    const confirm = window.confirm("Deseja Deletar?")
    if(confirm){
      this.taskList = []
    }
  }
  public validationInput(event: string, index: number) {

    if(!event.length){
      const confirm = window.confirm("Tarefa vazia, deseja deletar?")
      if (confirm) {
        this.deleteItemTaskList(index)
      }
    }
  }
  public setLocalStorage() {
    if(this.taskList){
      this.taskList.sort((primeiro, ultimo) => Number(primeiro.checked) - Number(ultimo.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
    }
  }
}
