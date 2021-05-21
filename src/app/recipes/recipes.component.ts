import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']  
})
export class RecipesComponent implements OnInit {
  //@Output() selectedRecipeItem=new EventEmitter<Recipe>()
  selectedRecipe:Recipe;
  constructor() { }

  ngOnInit(): void {

  }

}
