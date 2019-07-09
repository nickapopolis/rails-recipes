import * as React from 'react';
import {
  Theme,
  Typography,
  Chip
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';
import {RecipeForm}  from '../../RecipeNew/forms/RecipeForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  image: {
    objectFit: 'cover',
    width: '250px',
    height: '250px',
  },
  imageContainer: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  }
}));

interface StatsTextProps{
  children?: any;
}
interface RecipeHeaderProps{
  recipe: RecipeForm;
}

export default function RecipeHeader(props: RecipeHeaderProps){
  const classes = useStyles({});
  const { recipe } = props;
  const { images } = recipe;

  const title = (
    <Typography className={classes.informationText} variant="h4">
      {recipe.title}
    </Typography>
  );

  const author = (
    <Typography className={classes.informationText} variant="caption">
      {recipe.user.name}
    </Typography>
  );

  const description = (
    <Typography className={classes.informationText} variant="body2">
      {recipe.description}
    </Typography>);

  const StatsText = ({children}: StatsTextProps) => <Typography
    className={classes.statsText}
    variant="overline" >
    {children}
  </Typography>

  return (
    <div className={classes.root}>
      {/* <RecipeImages className={classes.recipeImages}/> */}
      {images && !_.isEmpty(images) && <div className={classes.imageContainer}>
          <img className={classes.image} src={images[0]}/>
        </div>
      }
      <div className={classes.informationContainer}>
        {title}
        <div className={classes.statsContainer}>
          <StatsText>
            liked this
            <Chip label="90%" />
          </StatsText>
          <StatsText>
            prep time
            <Chip label={`${recipe.prepTime} minutes` } />
          </StatsText>
          <StatsText>
            cooking time
            <Chip label={`${recipe.cookTime} minutes` } />
          </StatsText>
          <StatsText>
            total time
            <Chip label={`${recipe.totalTime} minutes` } />
          </StatsText>
          <StatsText>
            servings
            <Chip label={recipe.numberOfServings} />
          </StatsText>
          <StatsText>
            calories
            <Chip label={recipe.calories} />
          </StatsText>
        </div>
        {author}
        {description}
      </div>
    </div>
  );
}
