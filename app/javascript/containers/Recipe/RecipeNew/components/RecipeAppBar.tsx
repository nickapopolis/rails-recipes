import * as React from 'react';
import {
  Icon,
  Theme,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { FormDetails } from '@shopify/react-form-state';
import { RecipeForm } from '../forms/RecipeForm';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import classNames from 'classnames';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  discardButton: {
    marginRight: theme.spacing(1),
  },
  saveButton: {

  },
  saveIcon: {
    marginRight: theme.spacing(1),
  },
  toolbarCustom: {
    minHeight: '72px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
    top: theme.spacing(2),
    borderRadius: '4px',
    right: theme.spacing(8),
  },
  buttonsContainer: {

  },
  title: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(3),
  },
}));

interface RecipeAppBarProps{
  formDetails: FormDetails<RecipeForm>;
  discardChanges();
}
export default function RecipeAppBar({ formDetails, discardChanges }:RecipeAppBarProps) {
  const classes = useStyles({});
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbarCustom}>
        <Typography className={classes.title}>
          Unsaved changes
        </Typography>
        <div className={classes.buttonsContainer}>
          <Button
            variant="contained"
            aria-label="Save"
            size="medium"
            className={classes.discardButton}
            onClick={() => {discardChanges(); }}>
              Discard
          </Button>
          <Button
            color="secondary"
            variant="contained"
            aria-label="Save"
            size="medium"
            className={classes.saveButton}
              onClick={() => {formDetails.submit(); }}>
              <Icon  className={classNames(classes.saveIcon, 'fa fa-save')} />
              Save
          </Button>
        </div>
      </Toolbar>
    </AppBar>);
}
