import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme, Typography } from '@material-ui/core';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@material-ui/core';
import * as _ from 'lodash';

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing(4),
  },
  stepperBodyField: {
    marginTop: '-35px'
  },
  sectionTitle: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  paper: {
    paddingTop: theme.spacing(3),
  },
});
interface RecipeInstructionsProps extends WithStyles<typeof styles>{
  recipe: any;
}
interface RecipeInstructionsState{
  completedSteps: number[];
}
const RecipeInstructions = withStyles(styles)(
  class extends React.Component<RecipeInstructionsProps, RecipeInstructionsState> {
    state = {
      completedSteps: [],
    };
    getInstructions(){
      const {recipe} = this.props;
      return recipe.instructions || [];
    }
    getCurrentStep(){
      return _.first(_.xor(
        _.range(this.getInstructions().length),
        this.state.completedSteps,
      ));
    }
    toggleStepActive(index):void{
      const {completedSteps} = this.state;
      if(this.isStepCompleted(index)){
        this.setState({
          completedSteps: _.without(completedSteps, index)
        });
      }else{
        this.setState({
          completedSteps: [...completedSteps, index]
        });
      }
    }
    isStepCompleted(index):boolean{
      return _.includes(this.state.completedSteps, index);
    }
    isStepActive(index):boolean{
      return this.getCurrentStep() === index;
    }
    render() {
      const { classes, recipe } = this.props;
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography className={classes.sectionTitle} variant="h5">Instructions</Typography>
            <Stepper activeStep={this.getCurrentStep()} orientation="vertical">
              {(this.getInstructions()).map((instruction, index) => {
                return <Step key={index} active={true} onClick={
                  ()=>{this.toggleStepActive(index)}
                }>
                  <StepLabel completed={this.isStepCompleted(index)} active={this.isStepActive(index)}> </StepLabel>
                  <StepContent>
                    <Typography className={classes.stepperBodyField}>
                      {instruction.body}
                    </Typography>
                  </StepContent>
                </Step>
              })}
            </Stepper>
          </Paper>
        </div>
      );
    }
  },
);

export default RecipeInstructions;
