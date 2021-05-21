import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { Ingrideint } from '../shared/models/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ],
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients:Ingrideint[]=[]
  private igChanged: Subscription
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients=this.shoppingListService.getIngridients()
    this.igChanged= this.shoppingListService.ingrideintsChanged.
    subscribe((ingrideint:Ingrideint[])=>{
      this.ingridients=ingrideint
    })
  }
  ngOnDestroy(){
    this.igChanged.unsubscribe()
  }
  onEditItem(id:number){
    this.shoppingListService.startedEditing.next(id)
  }

}
