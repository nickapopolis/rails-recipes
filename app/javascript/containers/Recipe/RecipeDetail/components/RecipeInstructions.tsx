import * as React from 'react';
import {
  Theme,
  Typography,
  Hidden,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing(4),
  },
  stepperBodyField: {
    marginTop: '-35px',
  },
  sectionTitle: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(4),
    }
  },
  paper: {
    paddingTop: theme.spacing(3),
  },
  stepper: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: 'inherit',
    }
  },
  step: {
    cursor: 'pointer !important',
  }
}));

interface RecipeInstructionsProps{
  recipe: any;
}

export default function RecipeInstructions(props: RecipeInstructionsProps){
  const [completedSteps, setCompletedSteps] = React.useState([]);
  const classes = useStyles({});
  const { recipe } = props;
  const { instructions = [] } = recipe;

  function getCurrentStep(){
    return _.first(_.xor(
      _.range(instructions.length),
      completedSteps,
    ));
  }
  function toggleStepActive(index):void{
    if(isStepCompleted(index)){
      setCompletedSteps(_.without(completedSteps, index))
    }else{
      setCompletedSteps([...completedSteps, index])
    }
  }
  function isStepCompleted(index):boolean{
    return _.includes(completedSteps, index);
  }
  function isStepActive(index):boolean{
    return getCurrentStep() === index;
  }

  const content = (
    <React.Fragment>
      <Typography className={classes.sectionTitle} variant="h5">Instructions</Typography>
      <Stepper className={classes.stepper} activeStep={getCurrentStep()} orientation="vertical">
        {instructions.map((instruction, index) => {
          return <Step className={classes.step} key={index} active={true} onClick={
            ()=>{toggleStepActive(index)}
          }>
            <StepLabel completed={isStepCompleted(index)} active={isStepActive(index)}> </StepLabel>
            <StepContent>
              <Typography className={classes.stepperBodyField}>
                {instruction.body}
              </Typography>
            </StepContent>
          </Step>
        })}
      </Stepper>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <Hidden smUp>
        {content}
      </Hidden>
      <Hidden xsDown>
        <Paper className={classes.paper}>
          {content}
        </Paper>
      </Hidden>
    </div>
  );
}