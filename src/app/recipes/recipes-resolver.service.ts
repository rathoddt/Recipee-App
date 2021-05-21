import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService:DataStorageService, private recipeServiceL:RecipeService) { }
  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot    ){
    const recipes=this.recipeServiceL.getRecipes()
    if(recipes.length===0){
      return this.dataStorageService.fetchRecipes()
    }else{
      return recipes
    }
    
  }
}
