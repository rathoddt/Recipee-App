import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrideint } from 'src/app/shared/models/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html', 
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static:true}) nameInputRef:ElementRef
  // @ViewChild('amountInput', {static:true}) amountInputRef:ElementRef
  @ViewChild('f') sLForm:NgForm
  sunscription:Subscription
  editMode=false
  editedItemIndex:number
  editedItem:Ingrideint
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.sunscription= this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true
        this.editedItemIndex=index
        this.editedItem=this.shoppingListService.getIngridient(index)   
        this.sLForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })     
    } )
  }
  // addIngridients(){
  //   const ingName=this.nameInputRef.nativeElement.value
  //   const ingAmount = this.amountInputRef.nativeElement.value
  //   const newIngridient =new Ingrideint(ingName, ingAmount)
  //   this.shoppingListService.addIngridient(newIngridient)
  //   //this.ingridientAdded.emit(newIngridient)    
  // }

  onSubmit(form:NgForm){
    const value=form.value
    const newIngridient =new Ingrideint(value.name, value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngridient(this.editedItemIndex,newIngridient)
    }else{
      this.shoppingListService.addIngridient(newIngridient)
    }    
    //this.editMode=false
    form.reset()
    this.sLForm.reset()
  }

  ngOnDestroy(){
    this.sunscription.unsubscribe()
  }
  onClear(){
    this.editMode=false
    this.sLForm.reset()
  }
  onDelete(){
    this.shoppingListService.deleteIngridients(this.editedItemIndex)
    this.onClear()
  }
}
