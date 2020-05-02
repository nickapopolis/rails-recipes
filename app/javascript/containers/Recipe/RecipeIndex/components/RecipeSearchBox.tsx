import * as React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, TextField, Icon } from '@material-ui/core';
import classNames from 'classnames';
import * as _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
);

interface RecipeSearchBoxProps {
  searchQuery: String;
  setSearchQuery: Function;
}
export default function RecipeSearchBox(props: RecipeSearchBoxProps) {
  const classes = useStyles({});
  const { setSearchQuery, searchQuery } = props;
  return (
    <div className={classes.root}>
      <Icon className={classNames('fa fa-search')} />
      <TextField
        value={searchQuery}
        variant="outlined"
        onChange={(event) => {setSearchQuery(event.currentTarget.value); }}
      />
    </div>
  );
}
