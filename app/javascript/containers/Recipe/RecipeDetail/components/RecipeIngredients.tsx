import * as React from 'react';
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  ListSubheader,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as _ from 'lodash';

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
  },
  paper: {
    paddingTop: theme.spacing(3),
  },
  list: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      columnCount: 2,
    },
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  }
});
interface RecipeIngredientsProps extends WithStyles<typeof styles> {
  recipe: any;
}
const RecipeIngredients = withStyles(styles)(
  class extends React.Component<RecipeIngredientsProps, {}> {
    ingredientLine(ingredient){
      if (ingredient.number && ingredient.unitOfMeasurement){
        return `${ingredient.number} ${ingredient.unitOfMeasurement} ${ingredient.name}`;
      }
      else if (ingredient.number){
        return `${ingredient.number} ${ingredient.name}`;
      }
      else return ingredient.name;
    }
    ingredientsByGroup(){
      const { recipe } = this.props;
      const { ingredients } = recipe;
      const ingredientGroups =  _.chain(ingredients)
        .map('ingredientGroup')
        .compact()
        .keyBy('id')
        .values()
        .value();
      return [
        {
          id: null,
          name: null,
        },
        ...ingredientGroups
      ].map((ingredientGroup)=>{
        return {
          ...ingredientGroup,
          ingredients: _.filter(ingredients, (ingredient)=>{
            return (ingredientGroup.id === null && ingredient.ingredientGroup === null) ||
            (ingredient.ingredientGroup && ingredient.ingredientGroup.id === ingredientGroup.id )
          })
        }
      });
    }
    render() {
      const { classes } = this.props;
      
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5">Ingredients</Typography>
            <List className={classes.list}>
              {
                this.ingredientsByGroup().map((ingredientGroup)=>{
                  return <div key={ingredientGroup.id || 'root'}>
                    {ingredientGroup.name && <ListSubheader disableSticky={true}>{ingredientGroup.name}</ListSubheader>}
                      {ingredientGroup.ingredients.map((ingredient)=>{
                        return <ListItem className={classes.listItem} key={ingredient.id}>
                          <ListItemText primary={this.ingredientLine(ingredient)} />
                        </ListItem>
                      })}
                  </div>
                })
              }
            </List>
          </Paper>
        </div>
      );
    }
  },
);

export default RecipeIngredients;
