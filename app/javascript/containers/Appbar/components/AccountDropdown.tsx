
import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Button,
  IconButton,
  ListItemText,
  Icon,
  Typography,
  Paper,
  ListItemIcon,
} from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { UserContext } from '../../components/UserContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  accountIcon: {
    margin: '0.5em',
    color: theme.palette.text.secondary,
  },
  listItemIcon: {
    margin: '0.5em',
    color: theme.palette.text.secondary,
    transform: 'scale(0.7)',
  },
  accountIconButton: {
    marginLeft: 'auto',
    height: '2em',
  },
  menuItemLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  accountDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  name: {
    fontWeight: 'bold',
  },
  accountButton: {
    marginTop: theme.spacing(1),
  },
  editProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));
export default function AccountDropdown() {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    user,
  } = React.useContext(UserContext);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  async function signOut() {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    await fetch('/users/sign_out', {
      method: 'DELETE',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    });
    window.location.reload();
  }
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Account"
        aria-controls="customized-menu"
        aria-haspopup="true"
        className={classes.accountIconButton}
        onClick={handleClick}>
          <Icon className={classNames(classes.accountIcon, 'fa fa-user-circle')} />
      </IconButton>
      <Paper className={classes.paper} elevation={8}>
        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          {user && <MenuItem className={classes.profileMenuItem}>
            <div className={classes.accountDetails}>
              <Typography className={classes.name}>{user.firstName} {user.lastName}</Typography>
              <Typography>{user.email}</Typography>
            </div>
            <div className={classes.editProfile}>
              <ListItemIcon>
                <Icon className={classNames(classes.listItemIcon, 'fa fa-user')} />
              </ListItemIcon>
              <ListItemText primary="Edit profile" />
            </div>
            </MenuItem>
          }

          {!user && <Link to="/users/sign_up" className={classes.menuItemLink}>
            <MenuItem>
            <ListItemIcon>
                <Icon className={classNames(classes.listItemIcon, 'fa fa-user-plus')} />
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </Link> }
          {!user && <Link to="/users/sign_in" className={classes.menuItemLink}>
            <MenuItem>
              <ListItemIcon>
                <Icon className={classNames(classes.listItemIcon, 'fa fa-sign-in-alt')} />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </MenuItem>
          </Link>}
          {user && <MenuItem>
            <ListItemIcon>
                <Icon className={classNames(classes.listItemIcon, 'fa fa-sign-out-alt')} />
              </ListItemIcon>
              <ListItemText primary="Sign out" onClick={signOut} />
          </MenuItem>}
        </Menu>
      </Paper>
    </>
  );
}
