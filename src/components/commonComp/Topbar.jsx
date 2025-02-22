import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
  Badge,
  MenuItem,
  Button,
  Menu,
  Avatar,
} from "@mui/material";
import {
  Home,
  People,
  ShoppingCart,
  Receipt,
  AccountCircle,
  Notifications,
  Language,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Box, styled } from "@mui/system";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocalstorageService from "../../utils/helpers/localstorage-services";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  //   zIndex: theme.zIndex.drawer + 1,
  padding: "0",
  margin: "0",
  position: "sticky",
  top: "0px",
  left: "0px",
  width: "100%",
  backgroundColor: theme.palette.customBg.white,
  color: theme.palette.customBg.contrastText,
  borderBottom: "2px solid #E6EDFF",
}));

const Topbar = ({ mobileOpen, setMobileOpen,lightColor,mainColor,currentLink }) => {

    const location=useLocation();

  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);

 

  const navigate=useNavigate();
  // handle Logout
  const handleLogout=()=>{
      LocalstorageService.logoutUser();
      // post('/logout')
      navigate('/login');
  }


  // Notification menu handlers
  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  // Language menu handlers
  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  // User menu handlers
  const handleUserClick = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchor(null);
  };


  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBarStyled elevation={0} sx={{py:1}}>
      <Toolbar>
      <Box sx={{ flexGrow: 1 ,paddingBottom:{xs:"0.6rem",md:"0px"}}}>
        <IconButton
          // color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ color: "primary.main" }}
          fontWeight={700}
        >
          {currentLink}
        </Typography>

        </Box>
        {/* Notifications */}
        

        <IconButton
          // onClick={handleNotificationClick}
          sx={{
            // border: "1px solid #00C53C",
            backgroundColor: lightColor,
            color: mainColor,
            margin: "0 10px",
          }}
        >
          <Badge variant="dot" badgeContent={0} color="warning">
            <NotificationsNoneOutlinedIcon />
          </Badge>
          {/* <Badge badgeContent={100} color="secondary">
                  <NotificationsNoneOutlinedIcon />
                  </Badge> */}
        </IconButton>
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
        >
          <MenuItem onClick={handleNotificationClose}>
            <a
              href="/notifications/1"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Notification 1
            </a>
          </MenuItem>
          <MenuItem onClick={handleNotificationClose}>
            <a
              href="/notifications/2"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Notification 2
            </a>
          </MenuItem>
        </Menu>

        {/* Language Selector */}
        <Button
          onClick={handleLanguageClick}
          sx={{
            backgroundColor: lightColor,
            color: mainColor,
            textTransform: "none",
            borderRadius: "25px",
            margin: "0 10px",
            display: {
              xs: "none",
              md: "inherit",
            },
          }}
          // size="small"
          endIcon={<ArrowDropDownIcon />}
        >
          Eng
        </Button>
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleLanguageClose}
          disableScrollLock 
        >
          <MenuItem onClick={handleLanguageClose}>Eng</MenuItem>
          <MenuItem onClick={handleLanguageClose}>Hin</MenuItem>
          {/* <MenuItem onClick={handleLanguageClose}>Fren</MenuItem> */}
        </Menu>

        {/* User Avatar */}
        <IconButton onClick={handleUserClick}>
          {/* <Avatar>{usersDetail?.name?.[0]}</Avatar> */}
          <Avatar>A</Avatar>
        </IconButton>
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={handleUserClose}
          disableScrollLock
        >
          <MenuItem onClick={handleUserClose}>View Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Typography
          variant="body1"
          sx={{
            ml: 1,
            fontSize: "16px",
            color: "#3F59A3",
            fontWeight: "600",
            display: { xs: "none", md: "block" },
          }}
        >
          {/* {usersDetail?.name} */}
          Mr. Tanveer
          <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
            Admin
          </Typography>
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Topbar;
