import * as React from 'react';
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing.unit * 4,
  },
  title: {
    marginBottom: theme.spacing.unit,
  },
});
interface RecipeIngredientsProps extends WithStyles<typeof styles>{

}
const RecipeIngredients = withStyles(styles)(
  class extends React.Component<RecipeIngredientsProps, {}> {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Typography className={classes.title} variant="title">Ingredients</Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Ingredient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
  },
);

export default RecipeIngredients;
