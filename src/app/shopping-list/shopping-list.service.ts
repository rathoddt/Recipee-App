import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrideint } from '../shared/models/ingridient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //ingrideintsChnaged=new EventEmitter<Ingrideint[]>()
  ingrideintsChanged = new Subject<Ingrideint[]>()
  startedEditing=new Subject<number>()
  private ingridients:Ingrideint[]=[  
    new Ingrideint('Apples', 5),
    new Ingrideint('Tomatoes', 10)
  ]
  constructor() { }
  getIngridients(){
    return this.ingridients.slice()
  }
  getIngridient(index:number){
    return this.ingridients[index]
  }
  addIngridient(ingrideint:Ingrideint){
    this.ingridients.push(ingrideint)
    this.ingrideintsChanged.next(this.ingridients.slice())
  }
  addIngridients(ingridients:Ingrideint[]){
    this.ingridients.push(...ingridients)
    this.ingrideintsChanged.next(this.ingridients.slice())
  }
  updateIngridient(index:number, newIngridient: Ingrideint){
    this.ingridients[index]=newIngridient
    this.ingrideintsChanged.next(this.ingridients.slice())
  }
  deleteIngridients(index){
    this.ingridients.splice(index,1)
    this.ingrideintsChanged.next(this.ingridients.slice())
  }
}
