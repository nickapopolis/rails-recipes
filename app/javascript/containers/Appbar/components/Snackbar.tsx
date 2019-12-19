import * as React from 'react';
import {
  Snackbar as MaterialSnackbar,
  SnackbarContent as MaterialSnackbarContent,
  Theme,
  IconButton,
  Icon,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

import { ErrorContext } from '../../components/ErrorContext';
import * as _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export default function Snackbar() {
  const classes = useStyles({});
  const { errors, dismiss } = React.useContext(ErrorContext);

  return (
    <>
      {errors.map((error, errorIndex) => {
        return (
          <MaterialSnackbar
            key={errorIndex}
            aria-describedby="client-snackbar"
            open={true}
          >
            <MaterialSnackbarContent
            className={classes.error}
              message={
                <span id="client-snackbar" className={classes.message}>
                  <ErrorIcon
                    className={classNames(classes.icon, classes.iconVariant)}
                  />
                  {error}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  onClick={() => { dismiss(errorIndex); }}
                >
                  <CloseIcon className={classes.icon}/>
                </IconButton>,
              ]}
            />
          </MaterialSnackbar>
        );
      })}
    </>
  );
}
