import { Injectable, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNull, isUndefined, isNumber } from 'util';
import { DietType } from './enums/diet-types.enum';
import { HealthStatus } from './enums/health-status.enum';
import { MealType } from './enums/meal-types.enum';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private appID: string = 'a9ba2133';
  private apiKey: string = '0fdff4c1daa26f1b817f282188ab9eee';
  private queryBase: string = 'https://api.edamam.com/search?';

  constructor(private http: HttpClient) { }

  recipeSearch(queryText: string = 'chicken', options?: {
    startIndex?: number, endIndex?: number, maxIngredients?: number,
    dietType?: DietType, health?: HealthStatus[], mealType?: MealType, minCalorie?: number, maxCalorie?: number
  }) {
    let queryUrl: string = `${this.queryBase}app_id=${this.appID}&app_key=${this.apiKey}&q=${queryText}`;

    if (!isUndefined(options.startIndex) && options.startIndex > 0) {
      console.log('Modifying start: ', options.startIndex);
      queryUrl += `&from=${options.startIndex}`;
    }
    if (!isUndefined(options.endIndex) &&
      options.endIndex > options.startIndex &&
      options.endIndex !== 10) {
      console.log('Modifying end: ', options.endIndex);
      queryUrl += `&to=${options.endIndex}`;
    }
    if (!isNull(options.dietType) && !isUndefined(options.dietType)) {
      console.log('Modifying die: ', options.dietType);
      queryUrl += `&diet=${options.dietType}`;
    }
    if (!isNull(options.health) && !isUndefined(options.health)) {
      console.log('Modifying health status: ', options.health);
      for (const healthType of options.health) {
        queryUrl += `&health=${healthType}`;
      }
    }
    if (!isNull(options.mealType) && !isUndefined(options.mealType)) {
      console.log('Modifying meal type: ', options.mealType);
      queryUrl += `&meal=${options.mealType}`;
    }
    if (!isNull(options.maxCalorie) && !isUndefined(options.maxCalorie)) {
      // Testing if min calorie specified & appropriate
      if (isNull(options.minCalorie) || isUndefined(options.minCalorie) ||
        options.maxCalorie < options.minCalorie) {
        options.minCalorie = 0;
      }
      console.log('Modifying calories: ', options.minCalorie, options.maxCalorie);
      queryUrl += `&calorie=${options.minCalorie}-${options.maxCalorie}`;
    }
    return this.http.get(queryUrl);
  }

  getRecipe(recipeUri: string) {
    let filteredUri = recipeUri.replace(/[:/#]/g, this.uriCharReplacer);
    return this.http.get(`${this.queryBase}app_id=${this.appID}&app_key=${this.apiKey}&r=${filteredUri}`);
  }

  getCurrentMealRecipes() {
    let currentHour = new Date().getHours();
    let currentMeal = MealType.Snack;
    if (currentHour > 5 && currentHour < 10) {
      currentMeal = MealType.Breakfast;
    } else if (currentHour > 11 && currentHour < 14) {
      currentMeal = MealType.Lunch
    } else if (currentHour > 17 && currentHour < 20) {
      currentMeal = MealType.Lunch
    } else {
      currentMeal = MealType.Snack
    }
    return this.recipeSearch('*', {mealType: currentMeal});
  }

  private uriCharReplacer(selectChar: string): string {
    switch (selectChar) {
      case ':':
        return '%3A';
        break;
      case '/':
        return '%2F';
        break;
      case '#':
        return '%23';
        break;
      default:
        return '';
        break;
    }
  }
}
