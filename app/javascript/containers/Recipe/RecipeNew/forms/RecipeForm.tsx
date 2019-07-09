
export interface RecipeInstruction {
  body?: string;
}
export interface RecipeIngredient {
  number?: number;
  unitOfMeasurement?: string;
  name?: string;
  id?: number;
  ingredientGroup?: IngredientGroup;
}
export interface User {
  name?: string;
}
export interface Label {
  name?: string;
  id?: number;
}
export interface IngredientGroup {
  name?: string;
  id?: number;
  ingredients?: RecipeIngredient[];
}
export interface RecipeForm {
  title?: string;
  description?: string;
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  numberOfServings?: number;
  calories?: number;
  instructions?: RecipeInstruction[];
  ingredients?: RecipeIngredient[];
  ingredientGroups?: IngredientGroup[];
  id?: number;
  user?: User;
  labels?: Label[];
  images?: string[];
}
