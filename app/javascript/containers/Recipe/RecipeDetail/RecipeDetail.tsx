import * as React from 'react';
import { Divider, Hidden } from '@material-ui/core';
import RecipeHeader from './components/RecipeHeader';
import RecipeIngredients from './components/RecipeIngredients';
import RecipeInstructions from './components/RecipeInstructions';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';

const GET_RECIPE = gql`
  query getRecipe($id: ID!){
    recipe(id: $id){
      title
      calories
      description
      prepTime
      cookTime
      totalTime
      numberOfServings
      images
      upvotes
      downvotes
      user{
        firstName
        lastName
      }
      instructions{
        id
        body
      }
      ingredientGroups{
        id
        name
        ingredients{
          id
          name
        }
      }
    }
  }
`;

interface RecipeDetailProps {
  match: {
    params: {
      id,
    },
  };
}

export default function RecipeDetail(props:RecipeDetailProps) {
  const id = props.match.params.id;
  return (
    <Query key={id} query={GET_RECIPE} variables={{ id }}>
    {({ data, loading }) => {
      if (loading || !data) {
        return null;
      }
      const { recipe } = data;
      return <div>
        <RecipeHeader recipe={recipe}/>
        <Hidden smUp><Divider/></Hidden>
        <RecipeIngredients recipe={recipe}/>
        <Hidden smUp><Divider/></Hidden>
        <RecipeInstructions recipe={recipe}/>
      </div>;
    }}
    </Query>
  );
}
