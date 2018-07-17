import * as React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
interface MenuProps extends WithStyles<typeof styles>{
}
interface MenuState{
  auth?: boolean;
  anchorEl: HTMLElement;
}
const MenuAppBar = withStyles(styles)(
  class extends React.Component<MenuProps, MenuState> {
    state = {
      auth: true,
      anchorEl: null,
    };

    handleChange = (event, checked) => {
      this.setState({ auth: checked });
    }

    handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
      this.setState({ anchorEl: null });
    }

    render() {
      const { classes } = this.props;
      const { auth, anchorEl } = this.state;
      const open = Boolean(anchorEl);

      return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Title
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                  variant="persistent"
                  open={true}
                >
                  <div>
                    <p>drawer content</p>
                  </div>
                </Drawer>
            </div>
      );
    }
  });
export default MenuAppBar;
