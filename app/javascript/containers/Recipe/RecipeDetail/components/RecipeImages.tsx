import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import { WithStyles, createStyles, withStyles, Theme, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme: Theme) => createStyles({
  recipeImageContainer: {
    minHeight: '180px',
    minWidth: '180px',
    maxHeight: '180px',
    maxWidth: '180px',
  },
  uploader: {
    border: '2px dashed',
    color: 'grey',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: '4em',
  },
});
interface RecipeImagesProps extends WithStyles<typeof styles>{

}
const RecipeImages = withStyles(styles)(
  class extends React.Component<RecipeImagesProps, {}> {
    render() {
      const { classes } = this.props;
      const uploader = (
        <div className={classes.uploader}>
          <Icon className={classNames(classes.photoIcon, 'fa fa-cloud-upload-alt')}/>
          <Typography>Drop files to upload.</Typography>
        </div>
      );
      return (
       <div className={classes.recipeImageContainer}>
         {uploader}
        </div>
      );
    }
  },
);

RecipeImages;
