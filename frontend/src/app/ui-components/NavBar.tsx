import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, FunctionComponent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import parentsUrls from '../urls';

const pages = [{ label: 'About', href: '#about' }];

const NavBar: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Talent Pool
        </Typography>

        {/* Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            alignItems: 'center',
          }}
        >
          {pages.map((p) => (
            <Button
              key={p.label}
              color="inherit"
              component={RouterLink}
              to={p.href}
            >
              {p.label}
            </Button>
          ))}
          {!isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to={parentsUrls.login}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to={parentsUrls.register}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Hi, {username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* Mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {pages.map((p) => (
              <MenuItem
                key={p.label}
                onClick={handleCloseMenu}
                component={RouterLink}
                to={p.href}
              >
                {p.label}
              </MenuItem>
            ))}
            {!isAuthenticated ? (
              <>
                <MenuItem
                  onClick={handleCloseMenu}
                  component={RouterLink}
                  to={parentsUrls.login}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={handleCloseMenu}
                  component={RouterLink}
                  to={parentsUrls.register}
                >
                  Register
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

NavBar.displayName = 'NavBar';

export default NavBar;
