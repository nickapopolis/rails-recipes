import * as React from 'react';
import FormState, { FieldDescriptor } from '@shopify/react-form-state';
import { SignInForm } from './forms/SignInForm';
import {
  Theme,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';
import { UserContext } from '../components/UserContext';
// @ts-ignore
import LogoTransparent from '../../../assets/images/logo-transparent.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    maxWidth: '30rem',
    // minWidth: '30rem'
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  emailField: {
    marginBottom: theme.spacing(2),
  },
  container: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
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

export default function SignIn() {
  const classes = useStyles({});
  function initialFormValues(): SignInForm {
    return {
      email: null,
      password: null,
    };
  }
  const {
    reload,
  } = React.useContext(UserContext);

  function withField<T>(field:FieldDescriptor<T>) {
    return {
      value: field.value || '',
      onChange(event) {
        field.onChange(event.target.value);
      },
      onBlur: field.onBlur,
    };
  }

  return  (
    <FormState
      onSubmit={async ({ fields }) => {
        const user = _.mapValues(fields, 'value');
        const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
        const response = await fetch('/users/sign_in', {
          method: 'POST',
          mode: 'same-origin',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ user }),
        });
        if (response.status === 201) {
          window.location.reload();
        }else {

        }
      }}
      initialValues={initialFormValues()}>
      {(formDetails) => {
        const { fields } = formDetails;
        const {
          email,
          password,
        } = fields;
        return (
          <div className={classes.container}>
            <div className={classes.paper}>
            <div className={classes.logoContainer}>
                <Typography className={classes.title} variant="h4">Sign in to your account</Typography>
                <img className={classes.logo} src={LogoTransparent}/>
              </div>
              <TextField
                {...withField(email)}
                variant="outlined"
                placeholder="Email"
                label="Email"
                type="email"
                autoComplete="email"
                className={classes.emailField}
              />
              <TextField
                {...withField(password)}
                variant="outlined"
                placeholder="Password"
                type="password"
                label="Password"
                className={classes.textField}
              />
              <Button
                color="primary"
                variant="contained"
                aria-label="Sign in"
                onClick={() => { formDetails.submit(); }}>
                  Sign in
              </Button>
            </div>
          </div>
        );
      }
      }
    </FormState>
  );
}
