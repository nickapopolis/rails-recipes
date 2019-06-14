
export interface RecipeInstruction {
  body: string;
}
export interface RecipeForm {
  title: string;
  description: string;
  totalCookingTime: number;
  servings: number;
  calories: number;
  instructions: RecipeInstruction[];
}
