import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import RecipeHeader from './components/RecipeHeader';
import RecipeIngredients from './components/RecipeIngredients';
import RecipeInstructions from './components/RecipeInstructions';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const styles = (theme: Theme) => createStyles({
});
interface RecipeDetailProps extends WithStyles<typeof styles> {

}
const GET_RECIPE = gql`
  {
    recipe(id: 1){
      title
      calories
      description
      cookTime
      numberOfServings
      user{
        name
      }
      instructions{
        body
      }
      ingredients{
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

const RecipeDetail = withStyles(styles)(
  class extends React.Component<RecipeDetailProps, {}> {
    render() {
      const { classes } = this.props;
      return (
        <Query query={GET_RECIPE}>
        {({ data, loading }) => {
          if (loading || !data) {
            return null;
          }
          const { recipe } = data;
          return <div>
            <RecipeHeader
              title={recipe.title}
              authorName={recipe.user.name}
              description={recipe.description}
              totalCookingTime={recipe.cookTime}
              servings={recipe.numberOfServings}
              calories={recipe.calories}
              percentageLikes={'90%'}
            />
            <RecipeIngredients recipe={recipe}/>
            <RecipeInstructions recipe={recipe}/>
          </div>;
        }}
        </Query>
      );
    }
  },
);

export default RecipeDetail;
