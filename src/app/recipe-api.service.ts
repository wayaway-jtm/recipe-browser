import { Injectable, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNull, isUndefined } from 'util';
import { DietType } from './enums/diet-types.enum';
import { HealthStatus } from './enums/health-status.enum';
import { MealType } from './enums/meal-types.enum';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private appID: string = 'a9ba2133';
  private apiKey: string = '0fdff4c1daa26f1b817f282188ab9eee';

  constructor(private http: HttpClient) { }

  recipeSearch(queryText: string = 'chicken', startIndex: number = 0, endIndex: number = 10, maxIngredients?: number,
    dietType?: DietType, health?: HealthStatus[], mealType?: MealType, minCalorie: number = 0, maxCalorie?: number) {
    let queryUrl: string = `https://api.edamam.com/search?app_id=${this.appID}&app_key=${this.apiKey}&q=${queryText}`;

    if (startIndex !== 0 && startIndex > 0) {
      console.log('Modifying start: ', startIndex);
      queryUrl += `&from=${startIndex}`;
    }
    if (endIndex !== 0 && endIndex > startIndex && endIndex !== 10) {
      console.log('Modifying end: ', endIndex);
      queryUrl += `&to=${endIndex}`;
    }
    if (!isNull(dietType) && !isUndefined(dietType)) {
      console.log('Modifying die: ', dietType);
      queryUrl += `&diet=${dietType}`;
    }
    if (!isNull(health) && !isUndefined(health)) {
      console.log('Modifying health status: ', health);
      for (const healthType of health) {
        queryUrl += `&health=${healthType}`;
      }
    }
    if (!isNull(mealType) && !isUndefined(mealType)) {
      console.log('Modifying meal type: ', mealType);
      queryUrl += `&meal=${mealType}`;
    }
    if (!isNull(maxCalorie) && !isUndefined(maxCalorie)) {
      console.log('Modifying calories: ', minCalorie, maxCalorie);
      queryUrl += `&calorie=${minCalorie}-${maxCalorie}`;
    }
    return this.http.get(queryUrl);
  }
}
