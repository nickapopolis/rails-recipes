import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import classNames from 'classnames';
import SearchBox from './SearchBox';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navBrandHide: {
    minWidth: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navProfileHide: {
    minWidth: '100px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  icon: {
    margin: theme.spacing.unit,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});
interface MenuProps extends WithStyles<typeof styles>{
}
interface MenuState{
  mobileOpen?: boolean;
}
const MenuAppBar = withStyles(styles)(
  class extends React.Component<MenuProps, MenuState> {
    state = {
      mobileOpen: false,
    };
    handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }
    render() {
      const { classes } = this.props;
      const drawer = (
        <div>
          <div className={classes.toolbar} />
          <List>
            <ListItem button>
              <ListItemIcon>
                <Icon className={classNames('fa fa-plus')} />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon className={classNames('fa fa-utensils')} />
              </ListItemIcon>
              <ListItemText primary="Recipes" />
            </ListItem>
          </List>
        </div>
      );
      return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.navBrandHide}>
              </div>
              <SearchBox/>
              <div className={classes.navProfileHide}>
              </div>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
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
          <Hidden smDown implementation="css">
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
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
        </div>
      );
    }
  });
export default MenuAppBar;
