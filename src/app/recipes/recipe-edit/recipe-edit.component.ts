import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,
      private recipeService:RecipeService,
      private router:Router) { }
  id:number
  editMode=false
  recipe:Recipe
  recipeForm:FormGroup
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
        this.id=+params["id"]
        this.editMode=params["id"]!=null;
        this.initForm()
    })
  }
  private initForm(){
    let recipeName=''
    let recipeImagePath=''
    let recipeDescription=''
    let recipeIngridients=new FormArray([])
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id)
      recipeName=recipe.name
      recipeImagePath=recipe.imagePath
      recipeDescription=recipe.description
      if(recipe['ingridients']){
        for(let ingridient of recipe.ingridients ){
          recipeIngridients.push(
            new FormGroup({
              'name':new FormControl(ingridient.name, Validators.required),
              'amount':new FormControl(ingridient.amount, [
                Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingridients':recipeIngridients
    })
  }
  onSubmit(){
    //console.log(this.recipeForm)
    // const newRecipe=new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'], 
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingridients']
    //)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.editMode=false
    this.recipeForm.reset()
  }
  onClear(){
    this.router.navigate(['../'], {relativeTo:this.route})
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount':new FormControl([
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
    //*ngFor="let ingredientCtrl of controls; let i = index"
  }
  onDeleteIngridient(index:number){
    (<FormArray> this.recipeForm.get('ingridients')).removeAt(index)
    //clearing all items in a FormArray.
    //(<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}
