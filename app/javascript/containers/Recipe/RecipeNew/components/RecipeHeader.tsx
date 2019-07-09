import * as React from 'react';
import { Theme, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import RecipeImages from './RecipeImages';
import { RecipeForm } from '../forms/RecipeForm';
import { FormDetails } from '@shopify/react-form-state';


const useStyles = makeStyles((theme: Theme) => createStyles({
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
  }),
);
interface RecipeHeaderProps{
  formDetails?: FormDetails<RecipeForm>;
}
export default function RecipeHeader(props: RecipeHeaderProps) {
  const classes = useStyles({});
  const { formDetails } = props;
  const { fields } = formDetails;
  const {
    title,
    prepTime,
    cookTime,
    numberOfServings,
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

  const prepTimeField = (<TextField
    {...prepTime}
    id={prepTime.name}
    className={classes.textField}
    label="Prep time"
    type="number"
    variant="outlined"
    onChange={({ currentTarget }) => {
      prepTime.onChange(parseInt(currentTarget.value, 10));
    }}
  />);

  const totalCookingTimeField = (<TextField
    {...cookTime}
    id={cookTime.name}
    className={classes.textField}
    label="Total cooking time"
    type="number"
    variant="outlined"
    onChange={({ currentTarget }) => {
      cookTime.onChange(parseInt(currentTarget.value, 10));
    }}
  />);

  const servingsField = (<TextField
    {...numberOfServings}
    id={numberOfServings.name}
    className={classes.textField}
    label="Number of servings"
    type="number"
    variant="outlined"
    onChange={({ currentTarget }) => {
      numberOfServings.onChange(parseInt(currentTarget.value, 10));
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
          {prepTimeField}
          {totalCookingTimeField}
          {servingsField}
          {caloriesField}
        </div>
        {descriptionField}
      </div>
    </div>
  );
}
