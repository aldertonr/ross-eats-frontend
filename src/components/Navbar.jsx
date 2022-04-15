/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AuthService from '../services/auth.service';
import logo from '../res/scran_logo.png';

import '../styles/styles.css';

class ResponsiveAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null,
      userIsLoggedIn: false,
      userDetails: [],
    };
  }

  handleOpenUserMenu = (event) => {
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorElUser: null });
  };

  render() {
    const { userDetails, anchorElUser } = this.state;
    const logout = () => {
      AuthService.logout();
    };
    const { userIsLoggedIn } = this.props;
    return (
      <AppBar position="static" sx={{ backgroundColor: '#6a714f' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <img src={logo} alt="Logo" className="logo" />
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                component={Link}
                to="/"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/menu"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Menu
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                  {userIsLoggedIn
                    ? (
                      <Avatar
                        alt={userDetails.username}
                        src="/broken-image.jpg"
                      />
                    )
                    : <Avatar alt="?" src="/broken-image.jpg" />}

                </IconButton>
              </Tooltip>
              {userIsLoggedIn ? (
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                >

                  <MenuItem onClick={this.handleCloseUserMenu}>
                    <Link to="/login" onClick={logout} underline="none" className="textLink">
                      Logout
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseUserMenu}>
                    <Link to="/profile" underline="none" className="textLink">
                      Profile
                    </Link>
                  </MenuItem>
                </Menu>
              ) : (
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                >
                  <MenuItem onClick={this.handleCloseUserMenu}>
                    <Link to="/login" underline="none" className="textLink">
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseUserMenu}>
                    <Link to="/register" underline="none" className="textLink">
                      Register
                    </Link>
                  </MenuItem>
                </Menu>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default ResponsiveAppBar;
