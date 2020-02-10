import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.class';
import { RecipeApiService } from '../recipe-api.service';
import { RecipeSearchService } from '../recipe-search.service';

@Component({
  selector: 'recipe-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchText: string = '';
  searchResults: Recipe[] = [];

  constructor(private apiService: RecipeApiService, private searchService: RecipeSearchService) { }

  ngOnInit() {
  }

  getSearchResults() {
    this.searchResults = [];
    this.apiService.recipeSearch(this.searchText).subscribe(
      (data: any) => {
        for (const response of data.hits) {
          this.searchResults.push(new Recipe(response.recipe));
        }
      },
      err => console.log('Error: ', err),
      () => {
        this.searchService.storeSearchResults(this.searchResults)
        this.apiService.doneLoading();
      });
  }
}
