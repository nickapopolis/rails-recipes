import * as React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Icon,
  Typography,
  MenuItem,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Downshift from 'downshift';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInput: {
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '1.25em',
      fontWeight: 300,
      width: '100%',
      outline: 'none',
      height: 'inherit',
    },
    searchContainer: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '0.3em',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        width: '680px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    helpTextContainer: {
      padding: theme.spacing(2),
      backgroundColor: '#d0ffe7',
      borderRadius: '5px',
    },

    searchIcon: {
      margin: '0.5em',
      color: theme.palette.text.secondary,
      scale: 'transform(0.8)',
    },
    clearSearchIcon: {
      margin: '0.5em',
    },
    iconButtonClear: {
      padding: 0,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      borderRadius: '5px',
      top: '54px',
      left: 0,
      marginLeft: '24px',
      [theme.breakpoints.up('md')]: {
        width: '680px',
      },
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 48px)',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginLeft: 0,
        borderRadius: 0,
      },
    },
    downshift: {
      width: '100%',
    },
    button: {
      fontSize: '0.5rem',
      minWidth: '0',
    },
    emptyStateContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    emptyStateIcon: {
      width: 100,
      height: 100,
    },
    progress: {
      margin: theme.spacing(2),
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    hidden: {
      display: 'none',
    },
  }),
);

const SEARCH = gql`
  query search($queryString: String!) {
    search(queryString: $queryString, acceptTypes: ["Types::Recipe"]){
      ...on Recipe{
        title
        id
      }
    }
  }
`;

const RecipeSearchResult = ({ item }) => {
  const recipeLink = `/recipes/${item.id}`;

  return <Typography>{item.title}</Typography>;
};
const searchResultType = {
  Recipe: RecipeSearchResult,
};

interface SearchResultsProps {
  selectRecipe: Function;
  inputValue: string;
}

function SearchResults(props: SearchResultsProps) {

  const classes = useStyles({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { selectRecipe, inputValue } = props;

  function getSearchResult({ item, index, highlightedIndex, selectedItem, getItemProps }) {
    const SearchResultType = searchResultType[item.__typename];
    const key = `${item.__typename}-${item.id}`;
    const isSelected = selectedItem === item;
    const isHighlighted = highlightedIndex === index;
    const itemProps = getItemProps({
      key,
      index,
      item,
    });
    return <MenuItem
      {...itemProps}
      key={key}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}>
      <SearchResultType item={item} />
    </MenuItem>;
  }
  const KeyButton = (props) => {
    const { children } = props;
    return <Button className={classes.button} size="small" variant="contained">
      {children}
    </Button>;
  };
  const HelpText = () => {
    return <Typography variant="subtitle2" >
      Press <KeyButton>enter</KeyButton> to select, <KeyButton>up</KeyButton> or <KeyButton>down</KeyButton> to navigate,
      <KeyButton>esc</KeyButton> to dismiss.
    </Typography>;
  };
  const EmptyState = (props) => {
    const { searchText } = props;
    return <div className={classes.emptyStateContainer}>
      <Typography variant="h5">{`No results for: ${searchText}`}</Typography>
      <Typography color="textSecondary" variant="body2">Try adjusting your search results</Typography>
    </div>;
  };
  const ControlledAutocomplete = ({ onInputChange, data, loading, clearSelection, ...rest }) => {
    return <Downshift {...rest} >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
          <div className={classes.inputContainer}>
            <input className={classes.hidden}{...getInputProps({
            })} />
            {isOpen && <IconButton className={classes.iconButtonClear} onClick={clearSelection}>
                <Icon
                  className={classNames(classes.clearSearchIcon, 'fa fa-times-circle')}
                />
              </IconButton>
            }
            {isOpen && <Paper className={classes.paper} square>
              { (() => {
                if (loading) {
                  return <CircularProgress className={classes.progress} />;
                }
                if (!data || !data.search || _.isEmpty(data.search)) {
                  return <EmptyState searchText={inputValue} />;
                }
                const { search } = data;
                return <div>
                    <div className={classes.helpTextContainer}><HelpText /></div>
                    <div {...getMenuProps()}>
                      {search.map((item, index) => {
                        { return getSearchResult({ item, index, highlightedIndex, selectedItem, getItemProps }); }
                      })}
                    </div>
                  </div>;
              })()
              }
            </Paper>
            }
          </div>
        )}
    </Downshift>;
  };

  const clearSelection = () => {
    setInputValue('');
    setIsOpen(false);
  };

  const changeHandler = selectedItem => {
    setSelectedItem(null);
    setIsOpen(false);
    setInputValue('');
    selectRecipe(selectedItem);
  };

  const stateChangeHandler = changes => {
    const isOpenNewValue = (changes.type === Downshift.stateChangeTypes.mouseUp)
      ? changes.isOpen || isOpen
      : isOpen;

    setSelectedItem(changes.selectedItem || selectedItem);
    setIsOpen(isOpenNewValue);
    setInputValue(changes.inputValue || inputValue);
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setInputValue(value);
    setIsOpen(!!(value && value !== ''));
  };

  <Query query={SEARCH} variables={{ queryString: inputValue }}>
        {({ data, loading }) => <ControlledAutocomplete
            selectedItem={selectedItem}
            isOpen={isOpen}
            inputValue={inputValue}
            onChange={changeHandler}
            onStateChange={stateChangeHandler}
            onInputChange={handleInputChange}
            clearSelection={clearSelection}
            data={data}
            loading={loading}
          />
        }
  </Query>;

  const mapDispatchToProps = (dispatch) => {
    return {
    selectRecipe: (recipe) => {
      dispatch(push(`/recipes/${recipe.id}`));
    },
  };
  };
  export default connect(null, mapDispatchToProps)(SearchResults);
