import * as React from 'react';
import {
  Theme,
  Stepper,
  Step,
  StepContent,
  Typography,
  Paper,
  StepLabel,
  StepIcon,
  TextField,
  Icon,
  Fab,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import { RecipeForm, RecipeInstruction } from '../forms/RecipeForm';
import { FormDetails, FieldDescriptor } from '@shopify/react-form-state';
import * as _ from 'lodash';
import { replace } from '../../../../lib/utilities';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => createStyles({
  stepperBodyField: {
    width: '100%',
  },
  sectionTitle: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  paper: {
    paddingTop: theme.spacing(3),
  },
  addButton: {
    marginLeft: '-8px',
    color: 'white',
  },
  addButtonIcon: {
    transform: 'scale(0.65)',
  },
}));
interface RecipeInstructionsProps{
  formDetails?: FormDetails<RecipeForm>;
}
export default function RecipeInstructions(props:RecipeInstructionsProps) {
  const classes = useStyles({});
  const { formDetails } = props;
  const { fields } = formDetails;
  const { instructions } = fields;

  function instructionField(index, field) {
    const fieldValues = instructions.value[index];
    const instructionFieldValue = fieldValues[field];
    const initialFieldValue = instructions.initialValue[index] && instructions.initialValue[index][field];
    return {
      value: instructionFieldValue || '',
      initialvalue: initialFieldValue,
      onChange(event) {
        const lastInstruction = _.last(instructions.value);
        const newInstructionValue = {
          ...fieldValues,
          [field]: event.target.value,
        };
        instructions.onChange(
          !!lastInstruction.body
          ? [...replace(instructions.value, index, newInstructionValue), newInstruction()]
          : replace(instructions.value, index, newInstructionValue)
        );
      },
    };
  }

  function newInstruction(): RecipeInstruction {
    return {
      body: '',
      step: instructions.value.length,
    };
  }

  function addInstruction() {
    instructions.onChange([
      ...instructions.value,
      newInstruction(),
    ]);
  }

  return <Paper className={classes.paper}>
    <Typography className={classes.sectionTitle} variant="h5">Instructions</Typography>
    <Stepper activeStep={instructions.value.length - 1} orientation="vertical">
      {instructions.value.map((value, index) => {
        return <Step key={index} completed={false} active={true}>
          <StepLabel active={false}>Step {index + 1}</StepLabel>
          <StepContent>
            <TextField
              className={classes.stepperBodyField}
              {...instructionField(index, 'body')}
              multiline={true}
              variant="outlined"
            />
          </StepContent>
        </Step>;
      })}
      <Step completed={false} active={true} onClick={() => {addInstruction(); }}>
        <StepIcon icon={
          <Fab size="small" color="primary" aria-label="Add" className={classes.addButton}>
            <Icon className={classNames('fa fa-plus fa-xs', classes.addButtonIcon)}/>
          </Fab>
          }>
        </StepIcon>
      </Step>
    </Stepper>
  </Paper>;
}
