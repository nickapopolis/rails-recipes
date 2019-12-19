import * as React from 'react';
import {
  Theme,
  Typography,
  ListSubheader,
  ListItem,
  List,
  Hidden,
  Card,
  CardActionArea,
  Button,
  TextField,
  OutlinedInput,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';
import FormState, { FormDetails, FieldDescriptor } from '@shopify/react-form-state';
import { RecipeForm, IngredientGroup, RecipeIngredient } from '../forms/RecipeForm';
import classNames from 'classnames';
import { replace } from '../../../../lib/utilities';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(4),
    },
  },
  card: {
    paddingTop: theme.spacing(3),
  },
  cardActionArea: {
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
  },
  list: {

  },
  listItem: {
    padding: 0,
    display: 'block',
  },
  ingredientNumber: {
    marginRight: theme.spacing(1),
    flexGrow: 0,
  },
  unitOfMeasurement: {
    minWidth: '10em',
    marginRight: theme.spacing(1),
    flexGrow: 0,
  },
  ingredientName: {
    flexGrow: 1,
  },
  listSubheader: {
    paddingLeft: theme.spacing(4),
  },
  addButtonListItem: {
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  ingredientGroupName: {
    width: '50%',
  },
}));

interface RecipeIngredientsProps {
  formDetails?: FormDetails<RecipeForm>;
}

export default function RecipeIngredients(props: RecipeIngredientsProps) {
  const classes = useStyles({});
  const { formDetails } = props;
  const { fields } = formDetails;
  const { ingredientGroups } = fields;

  function addIngredientGroup() {
    ingredientGroups.onChange([...ingredientGroups.value, newIngredientGroup()]);
  }
  function newIngredientGroup():IngredientGroup {
    return {
      name: null,
      id: null,
      ingredients: [newIngredient()],
    };
  }
  function newIngredient():RecipeIngredient {
    return {
      number: null,
      name: null,
      unitOfMeasurement: null,
    };
  }
  function addIngredient(ingredients:FieldDescriptor<RecipeIngredient[]>) {
    ingredients.onChange([
      ...ingredients.value,
      newIngredient(),
    ]);
  }

  function withField<T>(field:FieldDescriptor<T>) {
    return {
      value: field.value || '',
      onChange(event) {
        field.onChange(event.target.value);
      },
      onBlur: field.onBlur,
    };
  }

  function onIngredientChange<T>(event, ingredients:FieldDescriptor<RecipeIngredient[]>, field:FieldDescriptor<T>) {
    const lastIngredient = _.last(ingredients.value);
    if (!!lastIngredient.name || !!lastIngredient.number || !!lastIngredient.unitOfMeasurement) {
      addIngredient(ingredients);
    }
    field.onChange(event.target.value);
  }

  const units = [
    { value: '', text: 'Unit (none)' },
    { value: 'tsp', text: 'tsp' },
    { value: 'Tbsp', text: 'Tbsp' },
    { value: 'pound', text: 'pound' },
    { value: 'kg', text: 'kg' },
    { value: 'cup', text: 'cup' },
  ];

  const content = <>
    <Typography className={classes.title} variant="h5">Ingredients</Typography>
    <List className={classes.list}>
      <FormState.List field={ingredientGroups}>
        {(ingredientGroup, ingredientGroupIndex) => {
          return <React.Fragment key={ingredientGroupIndex}>
            {ingredientGroupIndex > 0 && <ListSubheader className={classes.listSubheader} disableSticky={true}>
              <TextField
                {...withField(ingredientGroup.name)}
                margin="normal"
                placeholder="Ingredient group title"
                className={classes.ingredientGroupName}
                inputProps={{ 'aria-label': 'bare' }}
              />
            </ListSubheader>}
            <FormState.List field={ingredientGroup.ingredients}>
              {(ingredient, ingredientIndex) => {
                return <ListItem className={classes.listItem} key={`${ingredientGroupIndex}-${ingredientIndex}`}>
                  <CardActionArea className={classes.cardActionArea}>
                    <TextField
                      {...withField(ingredient.number)}
                      onChange={(event) => onIngredientChange(event, ingredientGroup.ingredients, ingredient.number)}
                      variant="outlined"
                      placeholder="Amount"
                      className={classes.ingredientNumber}
                    />
                    <Select
                      {...withField(ingredient.unitOfMeasurement)}
                      onChange={(event) => onIngredientChange(event, ingredientGroup.ingredients, ingredient.unitOfMeasurement)}
                      input={<OutlinedInput labelWidth={0} name="unitOfMeasurement" id="unit-of-measurement" />}
                      variant="outlined"
                      className={classes.unitOfMeasurement}
                    >
                      {units.map((unit) => {
                        return <MenuItem value={unit.value} key={unit.value}>{unit.text}</MenuItem>;
                      })}
                    </Select>
                    <TextField
                      {...withField(ingredient.name)}
                      onChange={(event) => onIngredientChange(event, ingredientGroup.ingredients, ingredient.name)}
                      variant="outlined"
                      placeholder="Ingredient"
                      className={classes.ingredientName}
                    />
                  </CardActionArea>
                </ListItem>;
              }}
            </FormState.List>
            <ListItem className={classNames(classes.listItem, classes.addButtonListItem)} key="add-ingredient">
              <Button variant="contained" color="primary" onClick={() => { addIngredient(ingredientGroup.ingredients); }}>
                Add ingredient
              </Button>
            </ListItem>
          </React.Fragment>;
        }}
      </FormState.List>
      <ListItem className={classNames(classes.listItem, classes.addButtonListItem)} key="add-ingredient-group">
        <Button variant="contained" color="primary" onClick={() => { addIngredientGroup(); }}>
          Add ingredient group
        </Button>
      </ListItem>
    </List>
  </>;

  return (
    <div className={classes.root}>
      <Hidden smUp>
        {content}
      </Hidden>
      <Hidden xsDown>
        <Card className={classes.card}>
          {content}
        </Card>
      </Hidden>
    </div>
  );
}
