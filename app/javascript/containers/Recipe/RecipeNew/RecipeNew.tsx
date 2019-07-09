import * as React from 'react';
import FormState from '@shopify/react-form-state';
import RecipeHeader from './components/RecipeHeader';
import { RecipeForm } from './forms/RecipeForm';
import RecipeInstructions from './components/RecipeInstructions';
import RecipeIngredients from './components/RecipeIngredients';
import {
  Icon,
  Fab,
  Theme,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import * as _ from 'lodash';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    recipeCreate(input: $input) {
      recipe{
        title
        calories
        description
        cookTime
        numberOfServings
        images
        user{
          name
        }
        instructions{
          id
          body
        }
        ingredients{   
          id                                      
          number
          name
          unitOfMeasurement
          ingredientGroup{
            name
            id
          }
        }
      }
      errors
    }
  }
`;
const GET_RECIPE = gql`
  query getRecipe($id: ID!){
    recipe(id: $id){
      title
      calories
      description
      cookTime
      numberOfServings
      images
      user{
        name
      }
      instructions{
        id
        body
      }
      ingredients{   
        id                                      
        number
        name
        unitOfMeasurement
        ingredientGroup{
          name
          id
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => createStyles({
  fab: {
    margin: theme.spacing(1),
    marginTop: -44,
    zIndex: 1400,

  },
}));

interface RecipeNewProps {
  recipe?: RecipeForm
}
export default function RecipeNew(props:RecipeNewProps){
  const classes = useStyles({});
  const editRecipe = props.recipe; 
  function initialFormValues(): RecipeForm {
    return {
      id: null,
      title: null,
      prepTime: null,
      cookTime: null,
      numberOfServings: null,
      calories: null,
      description: null,
      ingredientGroups: [{
        ingredients: [
          {
            number: null,
            name: null,
            unitOfMeasurement: null,
          }
        ]
      }],
      instructions: [
        { body: null },
      ]
    };
  }

  function isErrorResult(result){

  }

  return <Mutation mutation={CREATE_RECIPE}>
    {(createRecipe, {data}) => (
      <FormState
        onSubmit={async ({fields}) => {
          const recipe = _.mapValues(fields, 'value');
          return createRecipe({variables: {input: {recipe}}});
        }}
        initialValues={editRecipe || initialFormValues()}>
        {(formDetails) => {
            return (<div>
              <Fab color="secondary" aria-label="Save" className={classes.fab} onClick={()=>{formDetails.submit()}}>
              <Icon  className={classNames('fa fa-save')}
                />
              </Fab>
              <RecipeHeader formDetails={formDetails} />
              <RecipeIngredients formDetails={formDetails} />
              <RecipeInstructions formDetails={formDetails} />
            </div>);
          }
        }
      </FormState>
  )}
  </Mutation>;
}

