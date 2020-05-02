import * as React from 'react';
import FormState, { FieldDescriptor } from '@shopify/react-form-state';
import { SignUpForm } from './forms/SignUpForm';

import {
  Theme,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import * as _ from 'lodash';
import { UserContext } from '../components/UserContext';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// @ts-ignore
import LogoTransparent from '../../../assets/images/logo-transparent.png';
const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    minWidth: '30rem',
  },
  textField: {
    marginBottom: theme.spacing(2),
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
  password: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  passwordConfirmation: {
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
  passwordRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  logo: {
    maxWidth: '350px',
  },
  logoContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
  },
}));

export default function SignUp() {
  const classes = useStyles({});
  const [showPassword, setShowPassword] = React.useState(false);
  function initialFormValues(): SignUpForm {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  }
  const {
    user,
    reload,
  } = React.useContext(UserContext);

  function isErrorResult(result) {

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

  return  (
    <FormState
      onSubmit={async ({ fields }) => {
        const user = _.mapValues(fields, 'value');
        const apiUser = {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: user.password,
          password_confirmation: user.passwordConfirmation,
        };
        const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
        const response = await fetch('/users', {
          method: 'POST',
          mode: 'same-origin',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ user: apiUser }),
        });
        if (response.status === 200) {
          reload();
        }
      }}
      initialValues={initialFormValues()}>
      {(formDetails) => {
        const { fields } = formDetails;
        const {
          firstName,
          lastName,
          email,
          password,
          passwordConfirmation,
        } = fields;
        return (
          <div className={classes.container}>
            <div className={classes.paper}>
              <div className={classes.logoContainer}>
                <Typography className={classes.title} variant="h4">Create your account</Typography>
                <img className={classes.logo} src={LogoTransparent}/>
              </div>
              <div className={classes.nameRow}>
                <TextField
                  {...withField(firstName)}
                  variant="outlined"
                  placeholder="First name"
                  label="First name"
                  className={classes.firstName}
                />
                <TextField
                  {...withField(lastName)}
                  variant="outlined"
                  placeholder="Last name"
                  label="Last name"
                  className={classes.lastName}
                />
              </div>
              <TextField
                {...withField(email)}
                variant="outlined"
                placeholder="Email"
                type="email"
                autoComplete="email"
                label="Email"
                className={classes.textField}
              />
              <div className={classes.passwordRow}>
                <TextField
                  {...withField(password)}
                  variant="outlined"
                  placeholder="Password"
                  className={classes.password}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                <TextField
                  {...withField(passwordConfirmation)}
                  variant="outlined"
                  placeholder="Confirm password"
                  label="Confirm password"
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
                aria-label="Create account"
                onClick={() => { formDetails.submit(); }}>
                  Create account
              </Button>
            </div>
          </div>
        );
      }
      }
    </FormState>
  );
}
