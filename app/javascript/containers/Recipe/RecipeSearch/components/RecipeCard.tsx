import * as React from 'react';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import {
  Card,
  Typography,
  CardActionArea,
  Theme,
} from '@material-ui/core';
import * as _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      objectFit: 'cover',
      width: '70px',
      height: '70px',
    },
    link: {
      textDecoration: 'none',
    },
    card: {
      margin: theme.spacing(1),
    },
    cardActionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    text: {
      padding: theme.spacing(1),
    },
  }),
);

interface RecipeCardProps {
  recipe: any;
}
export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  const classes = useStyles({});
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        {recipe.images && !_.isEmpty(recipe.images) && (
          <img className={classes.image} src={recipe.images[0]} />
        )}
        <div className={classes.text}>
          <Typography>{recipe.title}</Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}
