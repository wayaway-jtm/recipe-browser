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
    uri: string;

    constructor(recipeObject: any) {
        this.uri = recipeObject.uri;
        this.label = recipeObject.label;
        this.imgSrc = recipeObject.image;
        this.srcSiteName = recipeObject.source;
        this.srcSiteUrl = recipeObject.url;
        this.servings = recipeObject.yield;
        this.dietLabels = recipeObject.dietLabels;
        this.healthLabels = recipeObject.healthLabels;
        this.ingredientLines = recipeObject.ingredientLines;
        this.calories = recipeObject.calories;
    }
}