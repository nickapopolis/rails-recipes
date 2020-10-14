import * as React from 'react';
import * as _ from 'lodash';
import RecipeSearchBox from './components/RecipeSearchBox';
import RecipeCategories from './components/RecipeCategories';
import RecipeSearchResults from './components/RecipeSearchResults';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Searchbox from '../../components/SearchBox';

interface RecipeIndexProps {
  match: {
    params: {
      query;
    };
  };
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recipeSearchBox: {
      marginBottom: theme.spacing(2),
      marginLeft: '0.6em',
    },
    recipeCategories: {
      marginBottom: theme.spacing(4),
      marginLeft: '0.6em',
    },
  }),
);

export default function RecipeIndex(props: RecipeIndexProps) {
  const query = _.get(props, 'match.params.query');
  const [searchQuery, setSearchQuery] = React.useState(query);
  const classes = useStyles({});

  return <div>
    <div className={classes.recipeSearchBox}>
      <Searchbox searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    </div>
    {/* <div className={classes.recipeCategories}>
      <RecipeCategories/>
    </div> */}
    <RecipeSearchResults searchQuery={searchQuery} />
  </div>;
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setSearchQuery: query => {
//       dispatch(push(`/search/${encodeURI(query)}`));
//     },
//   };
// };
// export default connect(
//   null,
//   mapDispatchToProps,
// )(RecipeSearchBox);
