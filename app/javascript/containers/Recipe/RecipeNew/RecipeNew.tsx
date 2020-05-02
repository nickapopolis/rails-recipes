import * as React from 'react';
import FormState, { FormDetails, validate, validators } from '@shopify/react-form-state';
import RecipeHeader from './components/RecipeHeader';
import { RecipeForm } from './forms/RecipeForm';
import RecipeInstructions from './components/RecipeInstructions';
import RecipeIngredients from './components/RecipeIngredients';
import RecipeAppBar from './components/RecipeAppBar';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import { ErrorContext } from '../../components/ErrorContext';
import { ApolloError } from 'apollo-client';

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
          firstName
          lastName
        }
        instructions{
          id
          body
          step
        }
        ingredients{
          id
          name
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

interface RecipeNewProps {
  recipe?: RecipeForm;
}

export default function RecipeNew(props:RecipeNewProps) {
  const editRecipe = props.recipe;
  const {
    push,
  } = React.useContext(ErrorContext);
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
            name: null,
          },
        ],
      }],
      instructions: [
        { body: null, step: 0 },
      ],
      images: [],
    };
  }
  function isValidIngredientGroups(ingredientGroups) {
    return true;
  }

  function isValidInstructions(instructions) {
    return true;
  }
  const recipeValidators = {
    title: validators.required('title required'),
    prepTime: validators.required('prep time required'),
    cookTime: validators.required('cook time required'),
    numberOfServings: validators.required('number of servings required'),
    description: validators.required('description required'),
    ingredientGroups: validate(isValidIngredientGroups, 'no ingredients'),
    instructions: validate(isValidInstructions, 'no instructions'),
  };
  function isErrorResult(result) {

  }

  function discardChanges() {
  }

  function handleError(error: ApolloError) {
    push(error.message);
  }
  function filterEmptyValues(recipe:RecipeForm) {
    return {
      ...recipe,
      ingredientGroups: _.map(recipe.ingredientGroups || [], (ingredientGroup) => {
        return {
          ...ingredientGroup,
          ingredients: _.filter(ingredientGroup.ingredients, (ingredient) => {
            return ingredient.name;
          }),
        };
      }),
      instructions: _.filter(recipe.instructions, (instruction) => {
        return instruction.body;
      }),
    };
  }

  return <Mutation onError={handleError} context={{ hasUpload: true }} mutation={CREATE_RECIPE}>
    {(createRecipe, result) => {
      return (<FormState
        validators={recipeValidators}
        validateOnSubmit={true}
        onSubmit={async ({ fields }) => {
          const recipe = _.mapValues(fields, 'value');
          createRecipe({ variables: { input: { recipe: filterEmptyValues(recipe) } } });
        }}
        initialValues={(editRecipe as RecipeForm) || initialFormValues()}>
        {(formDetails:FormDetails<RecipeForm>) => {
          return (<div>
              <RecipeAppBar formDetails={formDetails} discardChanges={discardChanges}/>
              <RecipeHeader formDetails={formDetails} />
              <RecipeIngredients formDetails={formDetails} />
              <RecipeInstructions formDetails={formDetails} />
            </div>);
        }
        }
      </FormState>);
    }}
  </Mutation>;
}
