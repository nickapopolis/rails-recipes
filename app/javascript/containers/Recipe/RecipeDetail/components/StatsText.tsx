import * as React from 'react';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statsText: {
      marginBottom: theme.spacing(0.5),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

interface StatsTextProps {
  children?: any;
}

export default function StatsText({ children }: StatsTextProps) {
  const classes = useStyles({});
  return (
    <Typography className={classes.statsText} variant="overline">
      {children}
    </Typography>
  );
}
