import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import { WithStyles, createStyles, withStyles, Theme, Paper, TextField, Typography, MenuItem, Button, CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import Downshift from 'downshift'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1.25em',
    fontWeight: 300,
    width: '100%',
    outline: 'none',
    height: '100%'
  },
  searchContainer: {
    backgroundColor: '#ffffff80',
    borderRadius: '0.3em',
    width: '680px',
    display: 'flex',
  },
  helpTextContainer: {
    padding: theme.spacing(2),
    backgroundColor: '#eaffd1',
    borderRadius: '5px',
  },

  searchIcon: {
    margin: '0.5em',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    marginLeft: '-48px',
    borderRadius: '5px',
    width: '680px',
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
  }
});
interface SearchBoxProps extends WithStyles<typeof styles>{

}
const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

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
const RecipeSearchResult = ({item})=>{
  const recipeLink = `/recipes/${item.id}`;

  return <Typography>{item.title}</Typography>;
};
const searchResultType = {
  'Recipe': RecipeSearchResult,
};
const SearchBox = withStyles(styles)(
  class extends React.Component<SearchBoxProps, {}> {
    getSearchResult({item, index, highlightedIndex, selectedItem, getItemProps}){
      const SearchResultType = searchResultType[item.__typename];
      const { classes } = this.props;
      const key = `${item.__typename}-${item.id}`
      const isSelected = selectedItem === item;
      const isHighlighted = highlightedIndex === index;
      const itemProps = getItemProps({
        key: key,
        index,
        item,
      })
      return <MenuItem
        {...itemProps}
        key={key}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}>
        <SearchResultType item={item}/>
      </MenuItem>;
    }
    render() {
      const { classes } = this.props;
      
      const KeyButton = (props)=>{
        const {children} = props;
        return <Button className={classes.button} size="small" variant="contained">
          {children}
        </Button>
      }
      const HelpText = ()=>{
        return <Typography variant='subtitle2' >
          Press <KeyButton>enter</KeyButton> to select, <KeyButton>up</KeyButton> or <KeyButton>down</KeyButton> to navigate, 
          <KeyButton>esc</KeyButton> to dismiss.
        </Typography>
      };
      const EmptyState= (props)=>{
        const {searchText} = props;
        return <div className={classes.emptyStateContainer}>
          <Typography variant='h5'>{`No results for: ${searchText}`}</Typography>
          <Typography color="textSecondary" variant='body2'>Try adjusting your search results</Typography>
        </div>
      }
      return (
        <div className={classes.searchContainer}>
            <Icon className={classNames(classes.searchIcon, 'fa fa-search')}/>
            <Downshift
              onChange={selection => alert(`You selected ${selection.value}`)}
              itemToString={item => (item ? item.value : '')}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
              }) => (
                <div>
                  <input placeholder="Search for recipes" className={classes.searchInput}{...getInputProps()} />
                  {isOpen && inputValue && <Paper className={classes.paper} square>
                  
                  <Query query={SEARCH} variables={ {queryString: inputValue}}>
                    {({ data, loading }) => {
                      if (loading ) {
                        return <CircularProgress className={classes.progress} />
                      }
                      if (!data || !data.search || _.isEmpty(data.search)){
                        return <EmptyState searchText={inputValue}/>
                      }
                      const {search} = data;
                      return <div>
                        <div className={classes.helpTextContainer}><HelpText/></div>
                        <div {...getMenuProps()}>
                          {search.map((item, index) => {
                            {return this.getSearchResult({item, index, highlightedIndex, selectedItem, getItemProps})}
                          })}
                        </div>
                      </div>
                    }}
                    </Query>
                  </Paper>
                  }
                </div>
              )}
            </Downshift>
        </div>
      );
    }
  },
);

export default SearchBox;