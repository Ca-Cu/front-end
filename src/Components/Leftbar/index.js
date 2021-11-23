import "./leftbar.css";
import React,{useState,useEffect} from 'react'
import Avatar from '@mui/material/Avatar';

import Divider from '@material-ui/core/Divider';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import {
  Bookmark
} from "@material-ui/icons";
import { ThemeContext } from "styled-components";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

export default function Leftbar({changeSection}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const user ={
    nombres:localStorage.getItem('nombres'),
    apellidos:localStorage.getItem('apellidos'),
    email:localStorage.getItem('correo'),
    tipousuario:localStorage.getItem('tipousuario')
  }
  return (
    <div className="drawer" >
      <div className={styles.toolbar} />
      <Divider />
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Avatar
            alt={user.nombres}
            src={user.profilePicture}
            sx={{ width: 156, height: 156 }}
          />
          <div className="profileInfo">
              <h4 className="profileInfoName">{user.nombres+" "+user.apellidos}</h4>
              <p className="profileInfoDesc">{user.email}</p>
              <p className="profileInfoDesc">{user.tipousuario}</p>
          </div>
          <Divider />
          <List>
            {user.tipousuario=="Medico"?
              <div>
                <ListItemButton name="Configuracion" className="Configuracion" onClick={handleClick}>
                  <ListItemIcon><SettingsIcon className="sidebarIcon"/> </ListItemIcon>
                  <ListItemText>Configuracion</ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton name="CrearUsuario" className="crearUsuario" onClick={changeSection('crearUsuario') } sx={{ pl: 4 }}>
                        <ListItemIcon><PersonAddIcon className="sidebarIcon"/> </ListItemIcon>
                        <ListItemText>CrearUsuario</ListItemText>
                      </ListItemButton>
                    </List>
                </Collapse>
                
              </div>
              :
              <div></div>
            }
            <ListItemButton name="Dashboard" className="Dashboard" onClick={changeSection('Feed') }>
              <ListItemIcon><EmojiEmotionsIcon className="sidebarIcon"/> </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </List>          
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}