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
import Edit from '@mui/icons-material/Edit';
import Exit from '@mui/icons-material/ExitToApp';
import Feedback from '@mui/icons-material/Feedback';
import Formularios from '@mui/icons-material/Notes';
import Servicios from '@mui/icons-material/MedicalServices';
import NuevoDoctor from '@mui/icons-material/Upgrade';

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
  const [openFor, setFor] = useState(false);
  const [openAdm, setAdm] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickFor = () => {
    setFor(!openFor);
  };
  const handleClickAdm = () => {
      setAdm(!openAdm);
    };
  const user ={
    nombres:localStorage.getItem('nombres'),
    apellidos:localStorage.getItem('apellidos'),
    email:localStorage.getItem('correo'),
    tipousuario:localStorage.getItem('tipousuario')
  }
  localStorage.setItem("formularios",false)
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
            <ListItemButton name="Configuracion" className="Configuracion" onClick={handleClick}>
              <ListItemIcon><SettingsIcon className="sidebarIcon"/> </ListItemIcon>
              <ListItemText>Configuracion</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton name="Editarperfil" className="Editarperfil" onClick={changeSection('editarUsuario') } sx={{ pl: 4 }}>
                    <ListItemIcon><Edit className="sidebarIcon"/> </ListItemIcon>
                    <ListItemText>Editar perfil</ListItemText>
                  </ListItemButton>
                </List>
            </Collapse>
            {localStorage.getItem('tipousuario')=="Paciente"?
              <div>
                <ListItemButton name="Formularios" className="Formularios" onClick={handleClickFor}>
                  <ListItemIcon><Formularios className="Formularios"/> </ListItemIcon>
                  <ListItemText>Formularios</ListItemText>
                    {openFor ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openFor} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton name="Formulariovacuna" className="Vacunacion" onClick={changeSection('Formulario vacuna') } sx={{ pl: 4 }}>
                        <ListItemIcon><NuevoDoctor className="sidebarIcon"/> </ListItemIcon>
                        <ListItemText>Registro vacunas</ListItemText>
                      </ListItemButton>
                    </List>
                </Collapse>
              </div>
              :
              <div></div>
            }
            {localStorage.getItem('tipousuario')=="Doctor"?
              <div>
                <ListItemButton name="Formularios" className="Formularios" onClick={handleClickFor}>
                  <ListItemIcon><Formularios className="Formularios"/> </ListItemIcon>
                  <ListItemText>Formularios</ListItemText>
                    {openFor ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openFor} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton name="Vacunacion" className="Vacunacion" onClick={changeSection('editarUsuario') } sx={{ pl: 4 }}>
                        <ListItemIcon><Servicios className="sidebarIcon"/> </ListItemIcon>
                        <ListItemText>Vacunacion</ListItemText>
                      </ListItemButton>
                    </List>
                </Collapse>
              </div>
              :
              <div></div>
            }
            {localStorage.getItem('tipousuario')=="Administrador"?
              <div>
                <ListItemButton name="Sistema" className="Sistema" onClick={handleClickAdm}>
                  <ListItemIcon><Formularios className="Formularios"/> </ListItemIcon>
                  <ListItemText>Sistema</ListItemText>
                    {openAdm ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAdm} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton name="Creardoctor" className="Creardoctor" onClick={changeSection('Crear doctor') } sx={{ pl: 4 }}>
                        <ListItemIcon><NuevoDoctor className="sidebarIcon"/> </ListItemIcon>
                        <ListItemText>Crear doctor</ListItemText>
                      </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                      <ListItemButton name="CrearVacuna" className="CrearVacuna" onClick={changeSection('Crear vacuna') } sx={{ pl: 4 }}>
                        <ListItemIcon><NuevoDoctor className="sidebarIcon"/> </ListItemIcon>
                        <ListItemText>Crear vacuna</ListItemText>
                      </ListItemButton>
                    </List>
                </Collapse>
              </div>
              :
              <div></div>
            }
            <ListItemButton name="Dashboard" className="Dashboard" onClick={changeSection('Feed') }>
              <ListItemIcon><Feedback className="sidebarIcon"/> </ListItemIcon>
              <ListItemText>Feed</ListItemText>
            </ListItemButton>
            <ListItemButton name="Exit" className="Exit" onClick={changeSection('Home') }>
              <ListItemIcon><Exit className="sidebarIcon"/> </ListItemIcon>
              <ListItemText>Exit</ListItemText>
            </ListItemButton>
          </List>          
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}