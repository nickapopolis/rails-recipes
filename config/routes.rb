Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  devise_for :users, :skip => [:sessions, :passwords, :registrations]

  devise_scope :user do
    post '/users/sign_in' => "devise/sessions#create"
    delete '/users/sign_out' => "devise/sessions#destroy"

    post '/users' => "registrations#create"
  end

  resources :recipes, only: %i(index show edit), to: "pages#index"
  get "/my_recipes", to: "pages#index"
  get "/users/sign_up", to: "pages#index"
  get "/users/sign_in", to: "pages#index"
  get "/search/:query", to: "pages#index"
  get "/search", to: "pages#index"

  root to: "pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
 