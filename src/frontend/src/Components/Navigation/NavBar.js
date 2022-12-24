import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Logo from '../../assets/images/logo.png';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
  {
    'id': 'products',
    'text': 'Products',
    'routeTo': '/products'
  },
  {
    'id': 'about',
    'text': 'About',
    'routeTo': '/about'
  },
  {
    'id': 'contact',
    'text': 'Contact',
    'routeTo': '/contact-us'
  }
];

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const searchInputRef = React.useRef(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Shubham Computers
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.routeTo}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: '0',
    top: '0',
    cursor: 'pointer'
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '&': {
      width: '100%',
      paddingRight: `calc(1em + ${theme.spacing(5)})`,
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 2),
    }
  }));

  const handleSearchClick = () => {
    const searchInput = searchInputRef.current.children[0].value.trim();
    if (searchInput.length > 0) {
      navigate(`/products/${searchInput}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{
      background: '#000',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 2, display: { xs: 'none', sm: 'flex' } }}>
            <img className="branding-logo" src={Logo} alt="logo" />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'block' },
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Shubham Computers
            </Typography>
          </Box>

          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <img className="branding-logo" src={Logo} alt="logo" />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { sm: 'flex', md: 'none' },
                flexGrow: 2,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Shubham Computers
            </Typography>
          </Box>
          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            mr: 3,
          }}
          >
            <Search>
              <StyledInputBase
                placeholder="Search Shubham Computers..."
                inputProps={{ 'aria-label': 'search' }}
                ref={searchInputRef}
              />
              <SearchIconWrapper>
                <SearchIcon onClick={handleSearchClick} />
              </SearchIconWrapper>
            </Search>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.id} sx={{ color: '#fff' }} component={Link} to={item.routeTo}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default React.memo(NavBar);
