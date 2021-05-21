import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:Recipe[]
  subscription:Subscription
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes()

    this.subscription= this.recipeService.recipeChanged.
    subscribe((recipes:Recipe[])=>{
      this.recipes=recipes
    })
  }
  onNewRecipe(){
    this.router.navigate(['./new'], {relativeTo:this.route})
    }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
 
}
