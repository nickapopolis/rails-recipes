import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipeCategoryCard from './RecipeCategoryCard';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Icon, Chip } from '@material-ui/core';
import classNames from 'classnames';
import {  Category } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    downIcon: {
      color: theme.palette.text.secondary,
      width: '0.4em !important',
    },
    categoryChip: {
      marginRight: theme.spacing(1),
    },
    chipLabel: {
      paddingRight: 0,
    },
    slidersIcon: {
      maxHeight: '0.8em',
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
  }),
);

const GET_RECIPE_CATEGORIES = gql`
  {
    recipeCategories {
      id
      name
      labels {
        name
      }
    }
  }
`;
interface GetRecipeCategoriesResponse {
  loading: boolean;
  data: {
    recipeCategories: Category[];
  };
}

export default function RecipeCategories() {
  const classes = useStyles({});

  function handleClick()  {

  }

  return (
    <div className={classes.root}>
      <Icon className={classNames('fa fa-sliders-h', classes.slidersIcon)} />
      <Query query={GET_RECIPE_CATEGORIES}>
        {({ data, loading }:GetRecipeCategoriesResponse) => {
          if (loading || !data) {
            return null;
          }
          const { recipeCategories } = data;
          if (!recipeCategories) {
            return null;
          }
          return recipeCategories.map((category, i) => {
            return <Chip
              key={category.id}
              label={ category.name }
              onClick={handleClick}
              onDelete={handleClick}
              className={classes.categoryChip}
              deleteIcon={<Icon className={classNames('fa fa-chevron-down', classes.downIcon)}/>}
            />;
          });
        }}
      </Query>
    </div>
  );
}
