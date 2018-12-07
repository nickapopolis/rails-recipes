import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import { WithStyles, createStyles, withStyles, Theme, Typography } from '@material-ui/core';
import classNames from 'classnames';
import RecipeImages from './RecipeImages';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: theme.spacing.unit * 4,
  },
  informationContainer: {
    marginLeft: theme.spacing.unit * 2,
  },
  informationText: {
    marginBottom: theme.spacing.unit / 2,
  },
  statsText: {
    marginBottom: theme.spacing.unit / 2,
    color: theme.palette.primary.dark,
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
interface RecipeHeaderProps extends WithStyles<typeof styles>{
  title?: string;
  authorName?: string;
  description?: string;
  totalCookingTime?: number;
  servings?: number;
  calories?: number;
  percentageLikes?: string;
}
const RecipeHeader = withStyles(styles)(
  class extends React.Component<RecipeHeaderProps, {}> {
    render() {
      const { classes } = this.props;
      const title = (<Typography
        className={classes.informationText}
        variant="headline">{this.props.title}</Typography>);
      const author = (<Typography
        className={classes.informationText}
        variant="caption">{this.props.authorName}</Typography>);
      const description = (<Typography
        className={classes.informationText}
        variant="caption" >{this.props.description}</Typography>);
      const percentageLikes = (<Typography
          className={classes.statsText}
          variant="subheading" >{this.props.percentageLikes}</Typography>);
      const totalCookingTime = (<Typography
        className={classes.statsText}
        variant="subheading" >{this.props.totalCookingTime}</Typography>);

      const servings = (<Typography
        className={classes.statsText}
        variant="subheading" >{this.props.servings}</Typography>);

      const calories = (<Typography
        className={classes.statsText}
        variant="subheading" >{this.props.calories}</Typography>);
      return (
        <div className={classes.root}>
          <RecipeImages/>
          <div className={classes.informationContainer}>
            {title}
            <div className={classes.statsContainer}>
              {percentageLikes} liked this • 
              {totalCookingTime} minutes • 
              {servings} servings • 
              {calories} calories • 
            </div>
            {author}
            {description}
          </div>
        </div>
      );
    }
  },
);

export default RecipeHeader;
