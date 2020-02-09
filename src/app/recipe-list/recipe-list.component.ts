import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from '../recipe-api.service';
import { Recipe } from '../recipe.class';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[] = [];

  constructor(private recipeService: RecipeApiService) { }

  ngOnInit() {
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
