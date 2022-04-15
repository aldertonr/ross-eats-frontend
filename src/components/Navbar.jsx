/* eslint-disable jsx-a11y/anchor-is-valid */
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
import MenuIcon from '@mui/icons-material/Menu';
import { Auth } from 'aws-amplify';
import logo from '../res/scran_logo.png';
import authHelper from '../libs/auth_helper';

import '../styles/styles.css';

class ResponsiveAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null,
    };
  }

  componentDidMount() {
    this.setState({ userIsAdmin: authHelper.userIsAdmin });
  }

  handleOpenUserMenu = (event) => {
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleOpenNav = (event) => {
    this.setState({ anchorElNav: event.currentTarget });
  };

  handleCloseNav = () => {
    this.setState({ anchorElNav: null });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorElUser: null });
  };

  render() {
    const { anchorElUser, anchorElNav } = this.state;
    const { user } = Auth;

    const userIsAdmin = authHelper.userIsAdmin();

    // console.log();
    return (
      <AppBar position="static" sx={{ backgroundColor: '#FFFCEF', color: 'black' }}>
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
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <img src={logo} alt="Logo" className="logo" />
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNav}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={this.handleCloseNav}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={this.handleCloseNav}>
                  <Link to="/" underline="none" className="textLink">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleCloseNav}>
                  <Link to="/menu" underline="none" className="textLink">
                    Menu
                  </Link>
                </MenuItem>
                {userIsAdmin && (
                <MenuItem onClick={this.handleCloseNav}>
                  <Link to="/manage" underline="none" className="textLink">
                    Admin
                  </Link>
                </MenuItem>
                )}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                component={Link}
                to="/"
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/menu"
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Menu
              </Button>
              {userIsAdmin && (
              <Button
                component={Link}
                to="/manage"
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Admin
              </Button>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                  {user
                    ? (
                      <Avatar
                        alt={user.username.toUpperCase()}
                        src="/broken-image.jpg"
                      />
                    )
                    : <Avatar alt="?" src="/broken-image.jpg" />}

                </IconButton>
              </Tooltip>
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
                  <Link to="#" onClick={() => Auth.signOut()} underline="none" className="textLink">
                    Logout
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleCloseUserMenu}>
                  <Link to="/profile" underline="none" className="textLink">
                    Profile
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default ResponsiveAppBar;
