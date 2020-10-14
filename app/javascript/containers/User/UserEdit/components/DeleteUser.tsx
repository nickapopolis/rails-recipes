import * as React from 'react';
import {
  Theme,
  Button,
  Typography,
  Paper,
  Icon,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';
import classNames from 'classnames';
const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    minWidth: '30rem',
  },
  description: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  trashIcon: {

  },
}));

export default function DeleteUser() {
  const classes = useStyles({});

  async function deleteAccount() {

  }

  return  (
    <Paper className={classes.paper}>
      <Typography className={classes.description}>
        You won't be able to recover your account once it is deleted.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        aria-label="Delete account"
        startIcon={<Icon className={classNames('fa fa-trash', classes.trashIcon)}/>}
        onClick={() => { deleteAccount(); }}>
          Delete account
      </Button>
    </Paper>
  );
}
