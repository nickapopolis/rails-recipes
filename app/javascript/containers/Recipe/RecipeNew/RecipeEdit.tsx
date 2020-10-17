import * as React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import RecipeNew from './RecipeNew';

const GET_RECIPE = gql`
  query getRecipe($id: ID!){
    recipe(id: $id){
      title
      calories
      description
      prepTime
      cookTime
      numberOfServings
      images
      user{
        firstName
        lastName
      }
      instructions{
        id
        body
      }
      ingredientGroups{
        name
        id
        ingredients{
          id
          name
        }
      }
    }
  }
`;

interface RecipeEditProps {
  match: {
    params: {
      id,
    },
  };
}
export default function RecipeEdit(props:RecipeEditProps) {
  const id = _.get(props, 'match.params.id');

  return <Query key={id} query={GET_RECIPE} variables={{ id }}>
    {({ data, loading }) => {
      if (loading || !data) {
        return null;
      }
      return <RecipeNew recipe={data.recipe}/>;
    }}
  </Query>;
}
