import React, { useEffect, useState } from 'react';
import { Drawer, Box, Divider, IconButton, useMediaQuery, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  People,
  ShoppingCart,
  Receipt,
  AccountCircle,
  Notifications,
  Language,
  Menu,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styled from '@emotion/styled';

const drawerWidth = 270;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    paddingLeft:3,
    transition: "scrollbar-width 0.3s ease-in",
    overflowX: "auto", // Enable horizontal scrolling
          "&::-webkit-scrollbar": {
            height: "2px", // Thin scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Scrollbar color
            borderRadius: "10px", // Rounded edges
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Darker color on hover
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent", // Transparent track
            borderRadius: "10px", // Rounded edges for the track
          },
          scrollbarWidth: "thin", // Thin scrollbar for Firefox
          scrollbarColor: "#cdcdcd transparent", // Firefox scrollbar colors


  },
}));


const Sidebar = ({sidebarLinks,lightColor,mainColor,setCurrentLink}) => {
    const [openSubmenu, setOpenSubmenu] = useState({});
    const location=useLocation();

    const handleSubmenuToggle = (menu) => {
        setOpenSubmenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
      };

      useEffect(()=>{
        sidebarLinks.map((link,index)=>{
          if(link?.children){
            const name=link.name
            setOpenSubmenu((prevState)=>{
              return {...prevState,[name]:false}
            })
          }
        })
      },[]);
    

  return (

    <DrawerStyled
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open
      >
    <div>
      {/* <Toolbar /> */}
      <Box sx={{width:"100%",py:3,paddingLeft:2}}>
        <Box
            component="img"
            sx={{
                height: "60px",
            }}
            alt="Indiazona."
            src="/logo.svg"
            />
      </Box>
      
      {/* <Divider /> */}
      <List >
      {
        sidebarLinks.map((link,index)=>{
          const IconComponent = link.icon;
          const name=link.name.toLowerCase();
          if(!link?.children){
            return (
              <ListItem 
              disablePadding
              key={link.path} 
              component={NavLink}
              onClick={()=>setCurrentLink(link.name)}
              to={link.path}
              sx={{
                color: location.pathname === link.path ? mainColor : "text.primary",
                backgroundColor: location.pathname === link.path ? lightColor : "inherit",
              }}
              >
              <ListItemButton >
                <ListItemIcon>
                  <IconComponent sx={{color:location.pathname === link.path ? mainColor : "currentColor"}} />
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItemButton>
            </ListItem>
            )
          }else return(
            <>
            <ListItem 
            disablePadding
            sx={{
              color: openSubmenu[name] ? mainColor : "text.primary",
              backgroundColor: openSubmenu[name] ? "#F6F6F6" : "inherit",
            }}
            >
              <ListItemButton onClick={() =>{
                 handleSubmenuToggle(name);
              }}>
                <ListItemIcon>
                  <IconComponent key={index} 
                  sx={{
                  color: openSubmenu[name] ? mainColor : "inherit",
                  }} />
                </ListItemIcon>
                <ListItemText primary={link.name} />
                {openSubmenu[name]? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

          {link?.children && link.children.map((sublink)=>{
          

          return(
          <Collapse in={openSubmenu[name]} timeout="auto" unmountOnExit>
              <ListItem 
              disablePadding
              key={link.path} 
              component={NavLink}
              to={sublink.path}
              onClick={()=>setCurrentLink(link.name)}
              sx={{
                color: location.pathname === sublink.path ? mainColor : "text.primary",
                backgroundColor: location.pathname === sublink.path ? lightColor : "inherit",
              }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText >
                   <FiberManualRecordIcon sx={{fontSize:"8px", mb:"1px"}} /> {sublink.name}
                  </ListItemText>
                  
                </ListItemButton>
              </ListItem>
            </Collapse>
          )})}

            </>
            
          )
        })
      }
      </List> 
    </div>
    </DrawerStyled>
  );
};

export default Sidebar;
