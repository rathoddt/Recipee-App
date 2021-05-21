import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number
  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params["id"]
      this.recipe=this.recipeService.getRecipe(this.id)
      //console.log(params["id"])
    })
  }
  onAddToShoppingList(){
    /*for (let ingridient in this.recipe.ingridients){
      this.shoppingListService.addIngridient(this.recipe.ingridients[ingridient])
    }*/
    this.recipeService.addIngridentsToShoppingList(this.recipe.ingridients)
  }
  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route})
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route})
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
