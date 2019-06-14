import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  Typography,
  Chip
} from '@material-ui/core';
import classNames from 'classnames';
import RecipeImages from './RecipeImages';
import { mergeClasses } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  recipeImages: {
    marginRight: theme.spacing(2) * 2,
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  informationText: {
    marginBottom: theme.spacing(0.5),
  },
  statsText: {
    marginBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(1),
    "& > span:first-child": {
      paddingLeft: 0
    }
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
const StatsText = ({children, className}) => <Typography
    className={className}
    variant="overline" >
    {children}
</Typography>

const RecipeHeader = withStyles(styles)(
  class extends React.Component<RecipeHeaderProps, {}> {
    render() {
      const { classes } = this.props;

      const title = (
        <Typography className={classes.informationText} variant="h4">
          {this.props.title}
        </Typography>
      );

      const author = (
        <Typography className={classes.informationText} variant="caption">
          {this.props.authorName}
        </Typography>
      );

      const description = (
        <Typography className={classes.informationText} variant="body2">
          {this.props.description}
        </Typography>);


      return (
        <div className={classes.root}>
          {/* <RecipeImages className={classes.recipeImages}/> */}
          <div className={classes.informationContainer}>
            {title}
            <div className={classes.statsContainer}>
              <StatsText className={classes.statsText}>
                liked this
                <Chip label={this.props.percentageLikes} />
              </StatsText>
              <StatsText className={classes.statsText}>
                total cooking time
                <Chip label={`${this.props.totalCookingTime} minutes` } />
              </StatsText>
              <StatsText className={classes.statsText}>
                servings
                <Chip label={this.props.servings} />
              </StatsText>
              <StatsText className={classes.statsText}>
                calories
                <Chip label={this.props.calories} />
              </StatsText>
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
