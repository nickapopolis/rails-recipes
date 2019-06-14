import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme, TextField } from '@material-ui/core';
import RecipeImages from './RecipeImages';
import { RecipeForm } from '../forms/RecipeForm';
import { FormDetails } from '@shopify/react-form-state';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  informationContainer: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    display: 'flex',
    flexDirection: 'column',
  },
  informationText: {
    marginBottom: theme.spacing(0.5),
  },
  statsText: {
    marginBottom: theme.spacing(0.5),
    color: theme.palette.primary.dark,
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  textField: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  imagesContainer: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
    },
  }
});
interface RecipeHeaderProps extends WithStyles<typeof styles>{
  formDetails?: FormDetails<RecipeForm>;
}
const RecipeHeader = withStyles(styles)(
  class extends React.Component<RecipeHeaderProps, {}> {
    render() {
      const { classes, formDetails } = this.props;
      const { fields } = formDetails;
      const {
        title,
        totalCookingTime,
        servings,
        calories,
        description,
      } = fields;

      const titleField = (<TextField
        {...title}
        id={title.name}
        className={classes.textField}
        label="Title"
        variant="outlined"
        onChange={({ currentTarget }) => {
          title.onChange(currentTarget.value);
        }}
      />);

      const totalCookingTimeField = (<TextField
        {...totalCookingTime}
        id={totalCookingTime.name}
        className={classes.textField}
        label="Total cooking time"
        type="number"
        variant="outlined"
        onChange={({ currentTarget }) => {
          totalCookingTime.onChange(parseInt(currentTarget.value, 10));
        }}
      />);

      const servingsField = (<TextField
        {...servings}
        id={servings.name}
        className={classes.textField}
        label="Number of servings"
        type="number"
        variant="outlined"
        onChange={({ currentTarget }) => {
          servings.onChange(parseInt(currentTarget.value, 10));
        }}
      />);

      const caloriesField = (<TextField
        {...calories}
        id={calories.name}
        className={classes.textField}
        label="Calories"
        type="number"
        variant="outlined"
        onChange={({ currentTarget }) => {
          calories.onChange(parseInt(currentTarget.value, 10));
        }}
      />);

      const descriptionField = (<TextField
        {...description}
        id={description.name}
        className={classes.textField}
        label="Description"
        variant="outlined"
        multiline
        onChange={({ currentTarget }) => {
          description.onChange(currentTarget.value);
        }}
      />);

      return (
        <div className={classes.root}>
          <div className={classes.imagesContainer}>
            <RecipeImages/>
          </div>
          <div className={classes.informationContainer}>
            {titleField}
            <div className={classes.statsContainer}>
              {totalCookingTimeField}
              {servingsField}
              {caloriesField}
            </div>
            {descriptionField}
          </div>
        </div>
      );
    }
  },
);

export default RecipeHeader;
