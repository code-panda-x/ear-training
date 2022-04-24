import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    height: '10vh',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TopMenu extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"

              className={classes.menuButton} 
            >
              <MenuIcon />
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
              <MenuItem onClick={this.handleClose}><a href="https://github.com/code-panda-x/ear-training" target="_blank" rel="noopener noreferrer" style={{'text-decoration':'none', color:'black'}}>About</a></MenuItem>
              <MenuItem onClick={this.handleClose}><a href="https://github.com/code-panda-x/ear-training" target="_blank" rel="noopener noreferrer" style={{'text-decoration':'none', color:'black'}}>Contact</a></MenuItem>
            </Menu>

            <Typography variant="h6" color="inherit" align="left" className={classes.grow}>
              Tone the Ear
            </Typography>

              <div>
                <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/"
                >
                Home
                </Button>
                {/* <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/tone"
                >
                Tone
                </Button>
                <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/pitch"
                >
                Pitch
                </Button>
                <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/midi"
                >
                Midi
                </Button> */}
                <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/tone"
                >
                Live Piano
                </Button>
                <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/studymode"
                >
                Study Mode
                </Button>
                <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  component={Link} to="/testmode"
                >
                Test Mode
                </Button>
              </div>

            {/* {auth && (
            )} */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopMenu);