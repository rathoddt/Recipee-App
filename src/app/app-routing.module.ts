import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',   redirectTo:'/recipes', pathMatch:'full'},
  // {path:'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'},         
  {path:'recipes', loadChildren:()=>import('./recipes/recipes.module').then(m=>m.RecipesModule)},
  {path:'shopping-list', loadChildren:()=>import('./shopping-list/shopping-list.module')
                        .then(m=>m.ShoppingListModule)},
  {path:'auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
9.8 kB	355 ms	
Scriptpolyfills.js	304	script	(index)	235 B	339 ms	
Scriptvendor.js	304	script	(index)	236 B	382 ms	
Scriptmain.js	200	script	(index)	59.5 kB	412 ms	
Scriptdefault~auth-auth-module~
recipes-recipes-module
~shopping-list-shopping-list-module.js	200	
script	bootstrap:149	311 kB	8 ms	
Scriptrecipes-recipes-module.js	200	
script	bootstrap:149	50.2 kB	4 ms	Scriptng-validate.js	200	script	content-script.js:1	127 kB	62 ms	XHRinfo?t=1621588002430	200	xhr	zone-evergreen.js:2863	391 B	3 ms	WebSocketwebsocket	101	websocket	sockjs.js:1687	0 B	Pending	Scriptbackend.js	200	script	content-script.js:1	263 kB	6 m
*/
