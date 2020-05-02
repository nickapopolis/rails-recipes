import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RecipeResponse } from './types';
import RecipeSearchResultCard from './RecipeSearchResultCard';
import * as _ from 'lodash';
import { Typography, Theme } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';

const GET_RECIPES = gql`
  {
    recipes: recipeFeed {
      title
      id
      images
      createdAt
      upvotes
      upvoted
      downvoted
    }
  }
`;

const SEARCH = gql`
  query search($queryString: String!) {
    recipes: search(queryString: $queryString, acceptTypes: ["Types::Recipe"]) {
      ... on Recipe {
        title
        id
        images
        createdAt
        upvotes
        upvoted
        downvoted
      }
    }
  }
`;

interface RecipeSearchResultsProps {
  searchQuery: string;
}

interface GetRecipesResponse {
  loading: boolean;
  data: {
    recipes: RecipeResponse[];
  };
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  searchMessage: {
    marginLeft: theme.spacing(1),
  }
}));

interface RecipeIngredientsProps {
  recipe: any;
}



export default function RecipeSearchResults(props: RecipeSearchResultsProps) {
  const classes = useStyles({});
  const { searchQuery } = props;
  const [votes, setVotes] = React.useState({});
  const query = !!searchQuery ? SEARCH : GET_RECIPES;
  const searchMessage = !!searchQuery
    ? `Search results for "${searchQuery}"`
    : 'Here\'s whats trending now';
  return <div>
    <Typography variant="h5" className={classes.searchMessage}>{searchMessage}</Typography>
    <Query query={query} variables={{ queryString: searchQuery }}>
    {({ data, loading }: GetRecipesResponse) => {
      if (loading || !data) {
        return null;
      }
      const { recipes } = data;
      return recipes.map((recipe) => {
        return <RecipeSearchResultCard recipe={recipe} votes={votes} setVotes={setVotes}/>;
      });
    }}
  </Query>
  </div>;
}

