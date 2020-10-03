# Tasteful recipes

This project aims to make a recipe website that fixes the problems which are rampant in popular recipe websites.
If this project is succussful then you will:
- reduce time spent scrolling on recipes
- reduce time spent loading recipes
- reduce time spent looking for ingredients and instructions on recipes

[![Build Status](https://travis-ci.org/nickapopolis/rails-recipes.svg?branch=master)](https://travis-ci.org/nickapopolis/rails-recipes)

## Development dependencies
  * Docker for mac
  * Ruby 2.3.1
  * Yarn v0.27.5
  * nvm

## Development Setup
```
git clone git@github.com:nickapopolis/rails-recipes.git
cd rails-recipes
nvm use
bundle install
yarn
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

