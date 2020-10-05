export interface Label {
  name: string;
}
export interface Category {
  id: string;
  name: string;
  labels: Label[];
}
export interface RecipeCategoryCardProps {
  category: Category;
}
export interface RecipeResponse {
  title: string;
  id: string;
  images: string[];
  datePublished: Date;
  upvotes: number;
  upvoted: boolean;
  downvoted: boolean;
}
