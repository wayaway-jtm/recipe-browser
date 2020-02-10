import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from '../recipe-api.service';
import { Recipe } from '../recipe.class';
import { RecipeSearchService } from '../recipe-search.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[] = [];
  // Used with Load Recipes btn for debugging
  // showRecipes: boolean = false;
  isLoading: boolean = false;

  constructor(private apiService: RecipeApiService, private searchService: RecipeSearchService) { }

  loadCurrentMeals() {
    // this.showRecipes = true;
    this.apiService.getCurrentMealRecipes().subscribe((data: any) => {
      for (const recipeObj of data.hits) {
        this.recipeList.push(new Recipe(recipeObj.recipe));
      }
    });
    this.apiService.doneLoading();
  }

  ngOnInit() {
    this.apiService.isSearching.subscribe(searching => this.isLoading = searching);
    this.recipeList.push(this.apiService.getTestRecipe());
    this.searchService.recipesChanged.subscribe(() => this.recipeList = this.searchService.getStoredRecipes());
    // this.recipeService.recipeSearch().subscribe((data: any) => {
    //   for (const recipeObj of data.hits) {
    //     this.recipeList.push(new Recipe(recipeObj.recipe));
    //   }
    // });
    // console.log(this.recipeList);
    // this.recipeService.getRecipe("http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6").subscribe(
    //   (data: any) => this.recipeList.push(new Recipe(data[0]))
    // );
  }

}
