import * as React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Icon,
} from '@material-ui/core';
import classNames from 'classnames';

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
      backgroundColor: 'white',
      borderRadius: '0.3em',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        width: '680px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      borderStyle: 'solid',
      border: '2px',
      borderColor: theme.palette.text.secondary,
    },
    searchIcon: {
      margin: '0.5em',
      color: theme.palette.text.secondary,
      scale: 'transform(0.8)',
    },
  }),
);

interface SearchBoxProps {
  setSearchQuery: any;
  searchQuery: string;
}
export default function SearchBox(props:SearchBoxProps) {
  const classes = useStyles({});
  const { searchQuery, setSearchQuery } = props;

  return (
    <div className={classes.searchContainer}>
      <Icon className={classNames(classes.searchIcon, 'fa fa-search')} />
      <input
        placeholder="Search for recipes"
        onChange={(event) => {setSearchQuery(event.target.value); event.preventDefault()}}
        value={searchQuery}
        className={classes.searchInput}
      />
    </div>
  );
}
