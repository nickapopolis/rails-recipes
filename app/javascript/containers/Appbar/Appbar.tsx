import * as React from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
} from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import AppbarSearchBox from './components/AppbarSearchBox';
import AccountDropdown from './components/AccountDropdown';
import { UserContext } from '../components/UserContext';
import Snackbar from './components/Snackbar';
// @ts-ignore
import LogoTransparent from '../../../assets/images/logo-transparent.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  appBarNew: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  navIconHide: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icon: {
    margin: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
  toolbarCustom: {
    minHeight: '56px',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    minWidth: drawerWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemLink: {
    width: '100%',
    textDecoration: 'none',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItemText: {
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.25),
  },
  listItemIcon: {
    maxHeight: '0.7em',
    maxWidth: '35px',
  },
  listItemIconRoot: {
    maxWidth: '35px',
    minWidth: '35px',
  },
  logo: {
    maxHeight: '100px',
    marginRight: theme.spacing(1),
  },
  rightContentContainer: {
    width: '100%',
  },
  accountDropdown: {
    right: 0,
    position: 'fixed',
  }
}));

interface MenuProps{
  children?: React.ReactNode;
  hideSearch: boolean;
}

interface NavLinkProps{
  uri?: string;
  iconKey?: string;
  text?: string;
}

export default function MenuAppBar(props: MenuProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles({});
  const {
    user,
  } = React.useContext(UserContext);

  const { hideSearch } = props;

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function NavLink(props: NavLinkProps) {
    return <ListItem button>
      <Link className={classes.listItemLink} to={props.uri}>
        <ListItemIcon className={classes.listItemIconRoot}>
          <Icon className={classNames(props.iconKey, classes.listItemIcon)} />
        </ListItemIcon>
        <ListItemText className={classes.listItemText} primary={props.text} />
      </Link>
    </ListItem>;
  }

  const drawer = (
    <div>
      <Hidden xsDown>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={LogoTransparent}/>
        </div>
      </Hidden>
      <List>
        <NavLink uri="/" iconKey="fa fa-search fa-xs" text="Browse"/>
        <NavLink uri="/recipes/new" iconKey="fa fa-plus" text="Add"/>
        {user && <NavLink uri="/my_recipes" iconKey="fa fa-book" text="My Recipes"/>}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.rightContentContainer}>
        {!hideSearch && <div className={classes.appBarNew}>
          <AppbarSearchBox/>
          <AccountDropdown />
        </div>}
        {hideSearch && <div className={classes.accountDropdown}>
          <AccountDropdown />
        </div>}
        <main className={classes.content}>
          <Snackbar/>
          {!hideSearch && <div className={classes.toolbar} />}
          {props.children}
        </main>
      </div>

      {/* {!hideSearch && <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbarCustom}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>

          <AccountDropdown/>
        </Toolbar>
      </AppBar>} */}
    </div>
  );
}
