import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.class';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {

  public recipesChanged: EventEmitter<Recipe[]>;
  private savedRecipes: Recipe[] = [];


  constructor() {
    this.recipesChanged = new EventEmitter();
  }

  storeSearchResults(recipes: Recipe[]) {
    this.savedRecipes = recipes;
    this.recipesChanged.emit(this.savedRecipes);
  }

  getStoredRecipes(): Recipe[] {
    return this.savedRecipes;
  }
}
