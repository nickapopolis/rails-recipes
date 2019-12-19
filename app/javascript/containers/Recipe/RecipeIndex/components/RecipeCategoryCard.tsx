import * as React from 'react';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
  Hidden,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Theme,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
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
    },
  }),
);

interface Label {
  name: string;
}
interface Category {
  name: string;
  labels: Label[];
}
interface RecipeCategoryCardProps {
  category: Category;
}

export default function RecipeCategoryCard({
  category,
}: RecipeCategoryCardProps) {
  const classes = useStyles({});
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function searchLabel(label: Label) {
    return encodeURI(label.name);
  }

  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        <List>
          <ListSubheader>{category.name}</ListSubheader>
          {category.labels.map((label, i) => {
            return (
              <ListItem button key={i}>
                <Link to={`/search/${searchLabel(label)}`}>
                <ListItemText primary={label.name} />
                </Link>
              </ListItem>
            );
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
            onClick={handleExpandClick}
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
                return (
                    <ListItem key={i}>
                      <Link to={`/search/${searchLabel(label)}`}>
                        <ListItemText primary={label.name} />
                      </Link>
                    </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Collapse>
      </Hidden>
    </Card>
  );
}
