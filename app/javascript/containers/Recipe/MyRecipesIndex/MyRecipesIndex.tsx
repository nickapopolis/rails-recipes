import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import {
  Card,
  Typography,
  Theme,
  CardActionArea,
} from '@material-ui/core';

import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';

import * as _ from 'lodash';

const GET_RECIPES = gql`
  {
    recipes{
      title
      calories
      description
      cookTime
      id
      numberOfServings
      images
      user{
        name
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => createStyles({
  image: {
    objectFit: 'cover',
    width: '70px',
    height: '70px',
  },
  link: {
    textDecoration: 'none',
  },
  card: {
    margin: theme.spacing(1),
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    padding: theme.spacing(1),
  }
})); 

export default function MyRecipesIndex() {
  const classes = useStyles({});
  function recipeLink(recipe) {
    return `/recipes/${recipe.id}`;
  }

  return (
    <Query query={GET_RECIPES}>
      {({ data, loading }) => {
        if (loading || !data) {
          return null;
        }
        const { recipes } = data;
        {return recipes.map((recipe) => {
          return <Link className={classes.link} key={recipe.id} to={recipeLink(recipe)}>
            <Card className={classes.card}>
              <CardActionArea className={classes.cardActionArea}>
                {recipe.images && !_.isEmpty(recipe.images) && <img className={classes.image} src={recipe.images[0]}/>}
                <div className={classes.text}>
                  <Typography>{recipe.title}</Typography>
                </div>
              </CardActionArea>
            </Card>
          </Link>
        })}
      }}
    </Query>
  );
}

