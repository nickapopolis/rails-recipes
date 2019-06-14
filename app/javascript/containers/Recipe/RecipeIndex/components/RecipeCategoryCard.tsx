import * as React from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Hidden,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Link,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme: Theme) => createStyles({
  card: {

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardContentXs: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    paddingBottom: `${theme.spacing(1)}px !important`,
    paddingLeft: theme.spacing(2),
  }
});
interface Label {
  name: string;
}
interface Category {
  name: string;
  labels: Label[];
}
interface RecipeCategoryCardProps extends WithStyles<typeof styles> {
  category: Category;
}
interface RecipeCategoryCardState {
  expanded: boolean;
}
const RecipeCategoryCard = withStyles(styles)(
  class extends React.Component<RecipeCategoryCardProps, RecipeCategoryCardState> {
    state = {
      expanded: false,
    };
    handleExpandClick() {
      this.setState({
        expanded: !this.state.expanded,
      })
    }
    render() {
      const { classes, category } = this.props;
      const { expanded } = this.state;
      return <Card className={classes.card}>
          <Hidden xsDown>
            <List>
              <ListSubheader>{category.name}</ListSubheader>
              {category.labels.map((label, i) => {
                return <ListItem button key={i}>
                  <ListItemText primary={label.name} />
                </ListItem>
              })}
            </List>
          </Hidden>
        <Hidden smUp>
          <CardContent className={classes.cardContentXs}>
            <Typography variant="h6" color="textSecondary" component="p">
              {category.name}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={this.handleExpandClick.bind(this)}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <List>
                {category.labels.map((label, i) => {
                  return <ListItem key={i}>
                    <ListItemText primary={label.name} />
                  </ListItem>
                })}
                </List>
              </CardContent>
          </Collapse>
        </Hidden>

      </Card>
    }
  }
);

export default RecipeCategoryCard;