import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from './models/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url='https://recipe-app-afaee-default-rtdb.firebaseio.com/recipes.json'
  constructor(private http:HttpClient, 
              private recipeService:RecipeService,
              private authService:AuthService) { }

  storeRecipes(){
    const recipes=this.recipeService.getRecipes()
    return this.http.put(this.url, recipes).subscribe((result)=>{
      console.log(result)
    })
  }

  fetchRecipes(){
    
      return this.http.get<Recipe[]>(this.url).pipe( map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe, ingridients:recipe.ingridients? recipe.ingridients:[]}
      })
    }),
    tap((recipes)=>{
      this.recipeService.setRecipes(recipes)
    }) )    
  }

}