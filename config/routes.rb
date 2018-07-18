Rails.application.routes.draw do
  resources :reviews
  resources :recipeimages
  resources :ingredients
  devise_for :users
  resources :recipes
  root to: "pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
