import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import "../../styles/NavBar.scss";
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';

const navItems = [
  {
    'id': 'home',
    'text': 'Home',
    'isExpandable': false,
    'routeTo': '/'
  },
  {
    'id': 'products',
    'text': 'Products',
    'isExpandable': true,
    'routeTo': '/products'
  },
  {
    'id': 'about',
    'text': 'About',
    'isExpandable': false,
    'routeTo': '/about'
  },
  {
    'id': 'contact',
    'text': 'Contact',
    'isExpandable': false,
    'routeTo': '/contact-us'
  }
];

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const [expandList, setExpandList] = React.useState(false);
  const searchInputRef = React.useRef(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setMobileSearchOpen(false); //close the search container on mobile
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const handleClick = async (e, item) => {
    if (item.isExpandable) {
      e.stopPropagation();
      setExpandList(!expandList);
    }
    else {
      await setMobileOpen(false);
      navigate(`${item.routeTo}`);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2, pl: 2 }}>
        <img className="branding-logo" src={Logo} alt="logo" style={{ verticalAlign: 'top' }} />
        Shubham Computers
      </Typography>
      <Divider />
      <List component="nav">
        <ListItemButton sx={{ pl: 2 }} onClick={(event) => handleClick(event, navItems[0])}>
          <ListItemText primary={navItems[0].text} />
        </ListItemButton>
        <ListItemButton sx={{ pl: 2 }} onClick={(event) => handleClick(event, navItems[1])}>
          <ListItemText primary={navItems[1].text} />
          {expandList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={expandList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/products">
              <ListItemText primary="All Products" />
            </ListItemButton>
            {props.categories.map((category, index) => (
              <ListItemButton sx={{ pl: 4, textTransform: 'capitalize' }} component={Link} to={category.routeTo} key={index}>
                <ListItemText primary={category.heading} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton sx={{ pl: 2 }} onClick={(event) => handleClick(event, navItems[2])}>
          <ListItemText primary={navItems[2].text} />
        </ListItemButton>
        <ListItemButton sx={{ pl: 2 }} onClick={(event) => handleClick(event, navItems[3])}>
          <ListItemText primary={navItems[3].text} />
        </ListItemButton>
      </List>
      <Divider />
      <div className="social-icons-wrapper">
      <a href="https://m.facebook.com/1171466706257889/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />Facebook
        </a>
        <a href="//api.whatsapp.com/send?phone=919322249976&text=https://www.shubhamcomputers.com/%0A%0AI'm interested in your products and I have a few questions. Can you help?" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> WhatsApp
        </a>
        <a href="https://instagram.com/shubhamcomputersbynaresh?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />Instagram
        </a>
        <a href="https://t.me/+RRCFqO62AcP8UUpR" target="_blank" rel="noopener noreferrer">
          <TelegramIcon />Telegram
        </a>
      </div>
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
    [theme.breakpoints.only('xs')]: {
      backgroundColor: alpha(theme.palette.common.black, 1)
    },
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
      // navigate(`/products/${searchInput}`);
      navigate({
        pathname: '/products',
        search: `?search=${searchInput}`
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.which === 13) {
      handleSearchClick();
    }
  }

  return (
    <AppBar position="sticky" sx={{
      background: '#000'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 2, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
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
                textDecoration: 'none',
                fontSize: { sm: '1.25em', md: '1.5em' }
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
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', flexGrow: 2 }}>
            <img className="branding-logo" src={Logo} alt="logo" />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { sm: 'flex', md: 'none' },
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '1.25em'
              }}
            >
              {/* Mobile Portrait Header */}
              Shubham Computers
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open search"
            edge="end"
            onClick={handleMobileSearchToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <SearchIcon />
          </IconButton>
          <Box sx={{
            flexGrow: 1,
            display: { sm: 'block' },
            mr: { md: 3 },
          }}
            className={mobileSearchOpen ? 'search-wrapper show' : 'search-wrapper'}
          >
            <Search>
              <StyledInputBase
                placeholder="Search Shubham Computers..."
                inputProps={{ 'aria-label': 'search' }}
                ref={searchInputRef}
                onKeyDown={handleKeyDown}
              />
              <SearchIconWrapper>
                <SearchIcon onClick={handleSearchClick} />
              </SearchIconWrapper>
            </Search>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.slice(1).map((item) => (
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
