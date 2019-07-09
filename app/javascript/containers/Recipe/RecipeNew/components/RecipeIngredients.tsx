import * as React from 'react';
import {
  Theme,
  Typography,
  ListSubheader,
  ListItem,
  ListItemText,
  List,
  Hidden,
  Checkbox,
  Card,
  CardActionArea,
  Button,
  TextField,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';
import { FormDetails} from '@shopify/react-form-state';
import { RecipeForm, IngredientGroup } from '../forms/RecipeForm';

import {replace } from '../../../../lib/utilities';

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
  },
  list: {

  },
  listItem: {
    padding: 0,
    display: 'block',
  },
  ingredientTextField: {
    paddingRight: theme.spacing(1),
  }
}));

interface RecipeIngredientsProps {
  formDetails?: FormDetails<RecipeForm>;
}

export default function RecipeIngredients(props: RecipeIngredientsProps){
  const classes = useStyles({});
  const { formDetails } = props;
  const { fields } = formDetails;
  const { ingredientGroups } = fields;

  function addIngredientGroup(){
    ingredientGroups.onChange([...ingredientGroups.value, newIngredientGroup()])
  }
  function newIngredientGroup(){
    return {
      name: null,
      id: null,
      ingredients: [
        newIngredient()
      ]
    };
  }
  function newIngredient(){
    return {
      number: null,
      name: null,
      unitOfMeasurement: null,
    }
  }
  function addIngredient(index){
    ingredientGroups.onChange(
      replace(ingredientGroups.value, index, newIngredient())
    );
  }

  const content = <React.Fragment>
    <Typography className={classes.title} variant="h5">Ingredients</Typography>
    <List className={classes.list}>
      {
        ingredientGroups.value.map((ingredientGroup, ingredientGroupIndex)=>{
          return <React.Fragment key={ingredientGroupIndex}>
            {ingredientGroupIndex > 0 && <ListSubheader disableSticky={true}>
              <TextField
                value={ingredientGroup.name}
                margin="normal"
                placeholder="Ingredient group title"
                inputProps={{ 'aria-label': 'bare' }}
              />
            </ListSubheader>}
              {ingredientGroup.ingredients.map((ingredient)=>{
                return <ListItem className={classes.listItem} key={ingredient.id}>
                  <CardActionArea className={classes.cardActionArea}>
                    <TextField
                      value={ingredient.number}
                      variant="outlined"
                      className={classes.ingredientTextField}
                    />
                    <TextField
                      value={ingredient.unitOfMeasurement}
                      variant="outlined"
                      className={classes.ingredientTextField}
                    />
                    <TextField
                      value={ingredient.name}
                      variant="outlined"
                      className={classes.ingredientTextField}
                    />
                  </CardActionArea>
                </ListItem>
              })}
          </React.Fragment>
        })
      }
      <ListItem className={classes.listItem}>
        <Button variant="contained" color="primary" onClick={()=>{addIngredientGroup()}}>
          Add ingredient group
        </Button>
      </ListItem>
    </List>
  </React.Fragment>

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
