import * as React from 'react';
import {
WithStyles,
  createStyles,
  withStyles,
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
  IconButton,
  Fab
} from '@material-ui/core';
import { RecipeForm, RecipeInstruction } from '../forms/RecipeForm';
import { FormDetails, FieldDescriptors, FieldDescriptor, ValueMapper } from '@shopify/react-form-state';
import * as _ from 'lodash';
import {replace } from '../../../../lib/utilities';
import classNames from 'classnames';

const styles = (theme: Theme) => createStyles({
  stepperBodyField: {
    // marginTop: '-30px'
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
    color: 'white'
  },
  addButtonIcon: {
    transform: 'scale(0.65)',
  }
});
interface RecipeInstructionsProps extends WithStyles<typeof styles> {
  formDetails?: FormDetails<RecipeForm>;
}
const RecipeInstructions = withStyles(styles)(
  class extends React.Component<RecipeInstructionsProps, {}> {
    private changeHandlers = new Map<string, { (newValue: any): void }>();

    instructionFields(field: FieldDescriptor<RecipeInstruction[]>, children) {
      const {
        value, initialValue, error, name, onBlur
      } = field;
      return value.map((fieldValues, index) => {
        const innerFields: FieldDescriptors<RecipeInstruction> = _.mapValues(
          fieldValues,
          (value, fieldPath) => {
            const initialFieldValue =
              initialValue[index] && initialValue[index][fieldPath];
            return {
              value,
              onBlur,
              name: `${name}.${index}.${fieldPath}`,
              initialValue: initialFieldValue,
              dirty: value !== initialFieldValue,
              error: error && error[index] && error[index][fieldPath],
              onChange: this.handleChange({ field, index, key: fieldPath }),
            };
          },
        );
        return children(innerFields, index);
      })

    }
    handleChange = <Key extends keyof RecipeInstruction>({
      field,
      index,
      key,
    }: {
      field: FieldDescriptor<RecipeInstruction[]>;
      index: number;
      key: Key;
    }) => {
      const hashKey = `${index}:${key}`;
      if (this.changeHandlers.has(hashKey)) {
        return this.changeHandlers.get(hashKey);
      }
      const handler = (newValue: RecipeInstruction[Key] | ValueMapper<RecipeInstruction[Key]>) => {
        const {
          onChange
        } = field

        onChange(value => {
          const existingItem = value[index];
          const newItem = {
            ...(existingItem as any),
            [key]:
              typeof newValue === 'function'
                ? (newValue as ValueMapper<RecipeInstruction[Key]>)(value[index][key])
                : newValue,
          };
          return replace(value, index, newItem);
        });
      };
      this.changeHandlers.set(hashKey, handler);
      return handler;
    }

    newInstruction(): RecipeInstruction{
      return {
        body: ''
      }
    }
    render() {
      const { classes, formDetails } = this.props;
      const { fields } = formDetails;
      const { instructions } = fields;
      return (
        <Paper className={classes.paper}>
          <Typography className={classes.sectionTitle} variant="h5">Instructions</Typography>
          <Stepper activeStep={instructions.value.length - 1} orientation="vertical">
            {this.instructionFields(instructions, (instructionFields, index) => {
        
              return <Step key={index} completed={false} active={true}>
                <StepLabel active={false}>Step {index + 1}</StepLabel>
                <StepContent>
                  <TextField
                    className={classes.stepperBodyField}
                    value={instructionFields.body.value}
                    {...instructionFields.body}
                    multiline={true}
                    variant="outlined"
                  />
                </StepContent>
              </Step>
            })}
            <Step completed={false} active={true} onClick={()=>{instructions.onChange([...instructions.value, this.newInstruction()])}}>
              <StepIcon icon={
                <Fab size="small" color="primary" aria-label="Add" className={classes.addButton}>
                  <Icon className={classNames('fa fa-plus fa-xs', classes.addButtonIcon)}/>
                </Fab>
                }>
              </StepIcon>
            </Step>
          </Stepper>
        </Paper>
      );
    }
  },
);

export default RecipeInstructions;

