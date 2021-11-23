import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link,MenuItem } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Swal from 'sweetalert2';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import DropForm from '../../Components/Conjuntos/DropForm';
import axios from 'axios';
import {Users} from '../../testData';
import Navigbar from '../../Components/Navigbar-landing';
import Footer from '../../Components/Footer';
import './login.css';

const Login=()=>{

    localStorage.removeItem('id');
    localStorage.removeItem('nombres');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('tipousuario');
    localStorage.removeItem('correo');

    const bcrypt = require("bcryptjs");
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    let history = useHistory();

    const handleChange = e => {
        const {name, value } = e.target;
    };

    const [showPassword,setShowPassword] = useState(false);
    const toggleShowPassword =()=>{
        setShowPassword(!showPassword);
    }
    const [dashboard,setDashboard] = useState('Administrador');

    const [residencia,setResidencia] = useState('vivienda');
    const toggleResidencia =(e)=>{
        setResidencia(e.target.value);
    }
    const[currentUserData,setCurrentUserData] =useState(null)

    const handleUser = (e) =>{
    }

    const  handleSubmit = (e) => {
        console.log(localStorage.getItem('nombre'));
        console.log(localStorage.getItem('asasa'));
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        var url = 'http://localhost:4567/login?correo='+data.get("user");
        axios.get(url, {
            responseType: "json",
        }).then((response) => {
            console.log(response);
            bcrypt.compare(data.get("password"), response.data["contraseña"], (err, coinciden) => {
                if (err) {
                    Swal.fire(err, "try again later", "error");
                } else {
                    if(coinciden){
                        Swal.fire( response.data["nombres"],"You're logged", "success").then(()=>{
                            localStorage.setItem('id',response.data["id"]);
                            localStorage.setItem('nombres',response.data["nombres"]);
                            localStorage.setItem('apellidos',response.data["apellidos"]);
                            localStorage.setItem('tipousuario',response.data["tipousuario"]);
                            localStorage.setItem('correo',data.get("user"));
                            e.preventDefault();
                            let redirect =''
                            if(response.data["tipousuario"] == "Paciente"){
                                redirect='/PacienteDashboard/';
                            }else if(response.data["tipousuario"] == "Doctor"){
                                redirect='/DoctorDashboard/';
                            }
                            console.log(redirect)
                            history.push(redirect);
                        });
                    }else{
                        Swal.fire("Fallo en autentificación", "Contraseña incorrecta", "error");
                    }
                }
            });
        }).catch(err => Swal.fire("Error", "El usuario no existe", "error"));

    };

    return(
        <div class="screen">

            <Navigbar/>
            <Grid class="login">
                <form onSubmit={handleSubmit} className="" >
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                            <h2>Iniciar Sesion</h2>
                        </Grid>
                        <div >
                            <div>
                                <TextField variant="outlined" id="user" name="user" label="Username" type="email"/>

                            </div>
                            <br></br>
                            <div >
                                <FormControl className="" variant="outlined">
                                    <InputLabel id="password" name="password" htmlFor="outlined-adornment-password">Password</InputLabel>

                                    <OutlinedInput fullWidth label="Password"
                                        id="outlined-adornment-password-login"
                                        type={showPassword? 'text' : 'password'}
                                        name="password"
                                        autoComplete="off"
                                        onChange={handleChange}

                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={toggleShowPassword}
                                                    edge="end"
                                                    name = "showPassword"
                                                    id = "showPassword"
                                                >
                                                    {showPassword? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </div >
                            <br></br>
                            <br></br>
                        </div>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    </Paper>
                </form>
            </Grid>
            <Footer/>

        </div>
    )
}
export default Login