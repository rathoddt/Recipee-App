import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';
import { Ingrideint } from '../shared/models/ingridient.model';
import { Recipe } from '../shared/models/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  //recipeSelected=new EventEmitter<Recipe>()
  //recipeSelected =new Subject<Recipe>()
  recipeChanged = new Subject<Recipe[]>()
  // private recipes:Recipe[]=[
  //   new Recipe('Tasty Schinztel', 
  //             'Super tasty Schinztel- just awesome',
  //             'https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_960_720.jpg',
  //             [
  //               new Ingrideint('Meat', 1),
  //               new Ingrideint('French Fries',20)
  //             ]),
  //   new Recipe('Big Fat Burger', 
  //              'What else you would need to say',
  //             'https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_960_720.jpg',
  //             [
  //               new Ingrideint('Buns',2),
  //               new Ingrideint('Meat',1)
  //             ])
  // ]
  private recipes:Recipe[]=[]
  constructor(private sLService:ShoppingListService) { }
  getRecipes(){
    return this.recipes.slice()
  }
  addIngridentsToShoppingList(ingrideints:Ingrideint[]){    
    this.sLService.addIngridients(ingrideints)
  }
  getRecipe(index:number){
    return this.recipes[index]
  }
  setRecipes(recipes:Recipe[]){
    this.recipes=recipes
    return this.recipeChanged.next(this.recipes.slice())
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    return this.recipeChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe
    return this.recipeChanged.next(this.recipes.slice())  
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    return this.recipeChanged.next(this.recipes.slice())  
  }
}
