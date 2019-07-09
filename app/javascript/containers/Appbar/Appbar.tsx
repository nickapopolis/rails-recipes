import * as React from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import SearchBox from './components/SearchBox';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    },
    minHeight: '56px',
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
    transform: 'scale(0.8)',
    minWidth: '45px',
  },
}));

interface MenuProps{
  children?: React.ReactNode;
}

interface NavLinkProps{
  uri?: string;
  iconKey?: string;
  text?: string;
}

export default function MenuAppBar(props: MenuProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles({});

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function NavLink(props: NavLinkProps){
    return <ListItem button>
      <Link className={classes.listItemLink} to={props.uri}>
        <ListItemIcon>
          <Icon className={classNames(props.iconKey, classes.listItemIcon)} />
        </ListItemIcon>
        <ListItemText className={classes.listItemText} primary={props.text} />
      </Link>
    </ListItem>
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <NavLink uri='/' iconKey='fa fa-home' text="Home"/>
        <NavLink uri='/recipes/new' iconKey='fa fa-plus' text="Add"/>
        <NavLink uri='/recipes' iconKey='fa fa-utensils fa-xs' text="Browse"/>
        <NavLink uri='/my_recipes' iconKey='fa fa-book' text="My Recipes"/>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbarCustom}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <SearchBox/>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
