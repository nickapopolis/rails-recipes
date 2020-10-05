
export interface RecipeInstruction {
  body?: string;
  step: number;
}
export interface RecipeIngredient {
  name?: string;
  id?: string;
  ingredientGroup?: IngredientGroup;
}
export interface User {
  firstName?: string;
  lastName?: string;
}
export interface Label {
  name?: string;
  id?: string;
}
export interface IngredientGroup {
  name?: string;
  id?: string;
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
  id?: string;
  user?: User;
  labels?: Label[];
  images?: string[];
  upvotes?: number;
  downvotes?: number;
  upvoted?: boolean;
  downvoted?: boolean;
}
