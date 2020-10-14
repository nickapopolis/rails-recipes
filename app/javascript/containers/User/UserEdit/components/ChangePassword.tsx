import * as React from 'react';
import FormState, { FieldDescriptor, FormData } from '@shopify/react-form-state';
import { UserContext } from '../../../../containers/components/UserContext';
import {
  Theme,
  Button,
  TextField,
  IconButton,
  Paper,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
  password: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  passwordConfirmation: {
    flexGrow: 1,
  },
  newPasswordRow: {
    display: 'flex',
    flexDirection: 'row',
  },,
}));

interface ChangePasswordForm{
  currentPassword: string | null;
  newPassword: string | null;
  newPasswordConfirmation: string | null;
}

// tslint:disable-next-line: function-name
export default function ChangePassword() {
  const classes = useStyles({});
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    user,
  } = React.useContext(UserContext);

  function initialFormValues(): ChangePasswordForm {
    return {
      currentPassword: null,
      newPassword: null,
      newPasswordConfirmation: null,
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
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  async function changePassword(formFields: FormData<ChangePasswordForm>) {
    const passwordValues = _.mapValues(formFields, 'value');
    console.log(user);
  }

  return  (
    // @ts-ignore
    <FormState
      initialValues={initialFormValues()}
      onSubmit={changePassword}
    >
      {(formDetails) => {
        const { fields } = formDetails;
        const {
          currentPassword,
          newPassword,
          newPasswordConfirmation,
        } = fields;
        return (
          <Paper className={classes.paper}>
            <TextField
              {...withField(currentPassword)}
              variant="outlined"
              placeholder="Current Password"
              className={classes.password}
              label="Current Password"
              type={'password'}
            />
            <div className={classes.newPasswordRow}>
              <TextField
                {...withField(newPassword)}
                variant="outlined"
                placeholder="New Password"
                className={classes.password}
                label="New Password"
                type={showPassword ? 'text' : 'password'}
              />
              <TextField
                {...withField(newPasswordConfirmation)}
                variant="outlined"
                placeholder="Confirm new password"
                label="Confirm new password"
                type={showPassword ? 'text' : 'password'}
                className={classes.passwordConfirmation}
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
            <Button
              color="primary"
              variant="contained"
              aria-label="Change password"
              onClick={() => { formDetails.submit(); }}>
                Change Password
            </Button>
          </Paper>
        );
      }
      }
    </FormState >
  );
}
