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
  Paper
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';

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
  paper: {
    paddingTop: theme.spacing(3),
  },
  list: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      columnCount: 2,
    },
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    display: 'block',
    cursor: 'pointer',
  },
  checkbox: {
    display: 'inline-block',
  },
  listItemText: {
    display: 'inline-block',
  },
}));

interface RecipeIngredientsProps {
  recipe: any;
}

export default function RecipeIngredients(props: RecipeIngredientsProps){
  const classes = useStyles({});
  const [ingredientsCompleted, setIngredientsCompleted] = React.useState([]);
  const { recipe } = props;
  const { ingredientGroups } = recipe;

  function toggleIngredientAdded(id:number):void{
    if(isIngredientCompleted(id)){
      setIngredientsCompleted(_.without(ingredientsCompleted, id))
    }else{
      setIngredientsCompleted([...ingredientsCompleted, id])
    }
  }

  function isIngredientCompleted(id:number) : boolean {
    return _.includes(ingredientsCompleted, id);
  }

  function ingredientLine(ingredient){
    if (ingredient.number && ingredient.unitOfMeasurement){
      return `${ingredient.number} ${ingredient.unitOfMeasurement} ${ingredient.name}`;
    }
    else if (ingredient.number){
      return `${ingredient.number} ${ingredient.name}`;
    }
    else return ingredient.name;
  }

  const content = <React.Fragment>
    <Typography className={classes.title} variant="h5">Ingredients</Typography>
    <List className={classes.list}>
      {
        ingredientGroups.map((ingredientGroup)=>{
          return <React.Fragment key={ingredientGroup.id || 'root'}>
            {ingredientGroup.name && <ListSubheader disableSticky={true}>{ingredientGroup.name}</ListSubheader>}
              {ingredientGroup.ingredients.map((ingredient)=>{
                return <ListItem className={classes.listItem} key={ingredient.id} onClick={
                  ()=>{toggleIngredientAdded(ingredient.id)}
                }>
                  <Checkbox
                    checked={isIngredientCompleted(ingredient.id)}
                    color="primary"
                    className={classes.checkbox}
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                  <ListItemText className={classes.listItemText} primary={ingredientLine(ingredient)} />
                </ListItem>
              })}
          </React.Fragment>
        })
      }
    </List>
  </React.Fragment>

  return (
    <div className={classes.root}>
      <Hidden smUp>
        {content}
      </Hidden>
      <Hidden xsDown>
        <Paper className={classes.paper}>
          {content}
        </Paper>
      </Hidden>
    </div>
  );
}
