import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipeCategoryCard from './RecipeCategoryCard';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    },
  }),
);

const GET_RECIPE_CATEGORIES = gql`
  {
    recipeCategories {
      name
      labels {
        name
      }
    }
  }
`;

export default function RecipeCategories() {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <Query query={GET_RECIPE_CATEGORIES}>
        {({ data, loading }) => {
          if (loading || !data) {
            return null;
          }
          const { recipeCategories } = data;
          if (!recipeCategories) {
            return null;
          }
          return recipeCategories.map((category, i) => {
            return (
              <div className={classes.cardContainer} key={i}>
                <RecipeCategoryCard category={category} />
              </div>
            );
          });
        }}
      </Query>
    </div>
  );
}
