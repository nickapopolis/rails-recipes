# rails-recipes

https://travis-ci.org/nickapopolis/rails-recipes.svg?branch=master

## Development dependencies
  * Docker for mac
  * Ruby 2.3.1p112
  * Yarn v0.27.5

## Development Setup
```
git clone git@github.com:nickapopolis/rails-recipes.git
cd rails-recipes
bundle install
docker-compose up -d
rails db:create
rails db:migrate
rails server
```

## Testing 
Run after setup
```
rails test
```

