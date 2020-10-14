import * as React from 'react';
import FormState, { FieldDescriptor } from '@shopify/react-form-state';
import { User } from '../../../../containers/components/UserContext';
import {
  Theme,
  Button,
  TextField,
  Paper,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    minWidth: '30rem',
  },
  firstName: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  lastName: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  nameRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
  },
}));

interface UserEditForm{
  firstName: string;
  lastName: string;
}

interface EditUserInformationProps{
  user?: User;
}

// tslint:disable-next-line: function-name
export default function EditUserInformation({ user } : EditUserInformationProps) {
  const classes = useStyles({});

  function initialFormValues(): UserEditForm {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  function withField<T>(field:FieldDescriptor<T>) {
    return {
      value: field.value || '',
      onChange(event) {
        field.onChange(event.target.value);
      },
      onBlur: field.onBlur,
    };
  }

  async function onSubmit({ fields }) {
    const user = _.mapValues(fields, 'value');
  }

  return  (
    // @ts-ignore
    <FormState
      onSubmit={onSubmit}
      initialValues={initialFormValues()}
    >
      {(formDetails) => {
        const { fields } = formDetails;
        const {
          firstName,
          lastName,
        } = fields;
        return (
          <Paper className={classes.paper}>
              <div className={classes.nameRow}>
                <TextField
                  {...withField(firstName)}
                  variant="outlined"
                  placeholder="First name"
                  label="First name"
                />
                <TextField
                  {...withField(lastName)}
                  variant="outlined"
                  placeholder="Last name"
                  label="Last name"
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                aria-label="Create account"
                onClick={() => { formDetails.submit(); }}>
                  Update account information
              </Button>
            </Paper>
        );
      }
      }
    </FormState>
  );
}
