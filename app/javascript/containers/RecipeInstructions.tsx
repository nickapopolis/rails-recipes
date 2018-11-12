import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing.unit * 4,
  },
});
interface RecipeInstructionsProps extends WithStyles<typeof styles>{

}
const RecipeInstructions = withStyles(styles)(
  class extends React.Component<RecipeInstructionsProps, {}> {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Typography variant="title">Instructions</Typography>
          <Paper/>
        </div>
      );
    }
  },
);

export default RecipeInstructions;
