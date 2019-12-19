import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, TextField, CircularProgress } from '@material-ui/core';

import RecipeCard from './components/RecipeCard';
import * as _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const SEARCH = gql`
  query search($queryString: String!) {
    search(queryString: $queryString, acceptTypes: ["Types::Recipe"]) {
      ... on Recipe {
        title
        id
      }
    }
  }
`;
interface RecipeSearchProps {
  match: {
    params: {
      query;
    };
  };
  setSearchQuery: Function;
}
function RecipeSearch(props: RecipeSearchProps) {
  const query = _.get(props, 'match.params.query');
  // const { setSearchQuery } = props;
  const [searchQuery, setSearchQuery] = React.useState(query);

  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <TextField
        value={searchQuery}
        onChange={(event) => {setSearchQuery(event.currentTarget.value); }}
      />
      {query && (
        <Query query={SEARCH} variables={{ queryString: searchQuery }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }  if (data.search) {
              return data.search.map(recipe => {
                return <RecipeCard recipe={recipe} />;
              });
            }
            return null;
          }}
        </Query>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchQuery: query => {
      dispatch(push(`/search/${encodeURI(query)}`));
    },
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(RecipeSearch);
