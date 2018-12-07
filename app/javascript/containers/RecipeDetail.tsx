import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';

const styles = (theme: Theme) => createStyles({
});
interface RecipeDetailProps extends WithStyles<typeof styles>{

}
const RecipeDetail = withStyles(styles)(
  class extends React.Component<RecipeDetailProps, {}> {
    render() {
      const { classes } = this.props;
      return (
       <div>
        <RecipeHeader
          title="Smokey Pork Sliders"
          authorName="Gordon Ramsay"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          totalCookingTime={60}
          servings={4}
          calories={400}
          percentageLikes={'90%'}
        />
        <RecipeIngredients/>
        <RecipeInstructions/>
       </div>
      );
    }
  },
);

export default RecipeDetail;
