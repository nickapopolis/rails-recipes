import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import RecipeCategoryCard from './RecipeCategoryCard'

import {
  WithStyles, createStyles, withStyles, Theme, Paper,
} from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';


const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  cardContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      flex: '1 1 21%',
      padding: theme.spacing(2),
    },
  }
});
interface RecipeCategoriesProps extends WithStyles<typeof styles> {

}
const GET_RECIPE_CATEGORIES = gql`
  {
    recipeCategories{
      name
      labels{
        name
      }
    }
  }
`;

const RecipeCategories = withStyles(styles)(
  class extends React.Component<RecipeCategoriesProps, {}> {
    render() {
      const { classes } = this.props;
      return <div className={classes.root}>
        <Query query={GET_RECIPE_CATEGORIES}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }
            const { recipeCategories } = data;
            if (!recipeCategories){
              return null;
            }
            return recipeCategories.map((category, i) => {
              return <div className={classes.cardContainer}>
                <RecipeCategoryCard category={category} key={i} />
              </div>
            })

          }}
        </Query>
      </div>
    }
  }
);

export default RecipeCategories;
