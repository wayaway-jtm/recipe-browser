import { DietType } from './enums/diet-types.enum';
import { HealthStatus } from './enums/health-status.enum';

export class Recipe {
    label: string;
    imgSrc: string;
    srcSiteName: string;
    srcSiteUrl: string;
    servings: number;
    dietLabels: DietType[];
    healthLabels: HealthStatus[];
    ingredientLines: string[];
    calories: number;

    constructor(recipeObject: any) {
        this.label = recipeObject.recipe.label;
        this.imgSrc = recipeObject.recipe.image;
        this.srcSiteName = recipeObject.recipe.source;
        this.srcSiteUrl = recipeObject.recipe.url;
        this.servings = recipeObject.recipe.yield;
        this.dietLabels = recipeObject.recipe.dietLabels;
        this.healthLabels = recipeObject.recipe.healthLabels;
        this.ingredientLines = recipeObject.recipe.ingredientLines;
        this.calories = recipeObject.recipe.calories;
    }
}