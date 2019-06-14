import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme, Typography } from '@material-ui/core';
import FormState from '@shopify/react-form-state';
import RecipeHeader from './components/RecipeHeader';
import { RecipeForm } from './forms/RecipeForm';
import RecipeInstructions from './components/RecipeInstructions';

const styles = (theme: Theme) => createStyles({

});
interface RecipeNewProps extends WithStyles<typeof styles> {

}

const RecipeNew = withStyles(styles)(
  class extends React.Component<RecipeNewProps, {}> {

    initialFormValues(): RecipeForm {
      return {
        title: 'Title',
        description: 'Description',
        totalCookingTime: 0,
        servings: 0,
        calories: 0,
        instructions: [
          { body: 'Enter some useful instructions here1' },
        ]
      };
    }
    render() {
      const { classes } = this.props;
      return <FormState
        initialValues={this.initialFormValues()}>
        {(formDetails) => {
          return (<div>
            <RecipeHeader formDetails={formDetails} />
            <RecipeInstructions formDetails={formDetails} />
          </div>);
        }
      }
    </FormState>;
    }
  },
);

export default RecipeNew;
