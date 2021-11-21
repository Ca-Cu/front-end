import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import './registerUser.css';

import axios from 'axios';
import Swal from "sweetalert2";
const RegisterUser = () => {
    const handleSubmit = (event) => {
        let body={}
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        body={
                tdoc:data.get("tdoc"),
                ndoc:data.get("ndoc"),
                nombres:data.get("nombres"),
                apellidos:data.get("apellidos"),
                fechadenacimiento:data.get("fechadenacimiento"),
                email:data.get("email"),
                password:data.get("password"),
                tipousuario:"Paciente"
        }
    };

    return (
        <div className="RegisterComponent">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" component="h1" gutterBottom>Registro</Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
           <TextField
                    required
                    id="tdoc"
                    name="tdoc"
                    label="Tipo"
                    variant="standard"
                    type="comboBox"
                    style ={{width: '10%'}}
                    />
            <TextField
                    required
                    id="ndoc"
                    name="ndoc"
                    label="numero de Documento"
                    variant="standard"
                    type="number"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" >
            <TextField
                    required
                    id="nombres"
                    name="nombres"
                    label="Nombres completos"
                    variant="outlined"
                    helperText="Nombres completos"
                    />

            <TextField
                    required
                    id="apellidos"
                    name="apellidos"
                    label="Apellidos completos"
                    variant="outlined"
                    helperText="Apellidos completos"

                    />
            <TextField
                    required
                    id="fechadenacimiento"
                    name="fechadenacimiento"
                    type="date"
                    variant="outlined"
                    helperText="Fecha De Nacimiento"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="paisdeorigen"
                    name="paisdeorigen"
                    label="País de origen"
                    variant="outlined"
                    helperText="País de origen"
                    />
            <TextField
                    required
                    id="departamentodeorigen"
                    name="departamentodeorigen"
                    label="Departamento de origen"
                    variant="outlined"
                    helperText="Departamento de origen"
                    />
            <TextField
                    required
                    id="municipiodeorigen"
                    name="municipiodeorigen"
                    label="Municipio de origen"
                    variant="outlined"
                    helperText="Municipio de origen"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="paisderesidencia"
                    name="paisderesidencia"
                    label="País de residencia"
                    variant="outlined"
                    helperText="País de residencia"
                    />
            <TextField
                    required
                    id="departamentoderesidencia"
                    name="departamentoderesidencia"
                    label="Departamento de residencia"
                    variant="outlined"
                    helperText="Departamento de residencia"
                    />
            <TextField
                    required
                    id="municipioderesidencia"
                    name="municipioderesidencia"
                    label="Municipio de residencia"
                    variant="outlined"
                    helperText="Municipio de residencia"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="estadocivil"
                    name="estadocivil"
                    label="Estado civil"
                    variant="outlined"
                    helperText="Estado civil"
                    />
            <TextField
                    required
                    id="niveleducativo"
                    name="niveleducativo"
                    label="Nivel educativo"
                    variant="outlined"
                    helperText="Nivel educativo"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="regimendesalud"
                    name="regimendesalud"
                    label="Regimen de salud"
                    variant="outlined"
                    helperText="Regimen de salud"
                    />
            <TextField
                    required
                    id="eps"
                    name="eps"
                    label="eps"
                    variant="outlined"
                    helperText="eps"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="email"
                    name="email"
                    label="correo"
                    variant="outlined"
                    helperText="correo"
                    />
            <TextField
                    required
                    id="password"
                    name="password"
                    label="contraseña"
                    variant="outlined"
                    type="password"
                    helperText="contraseña segura 7 carácteres"
                    />
            </Stack>
            <br/>
            <Box textAlign='center'>
                <Button type="submit" class="button" variant="contained" endIcon={<SendIcon />}>Confirmar</Button>
            </Box>
        </Box>
        </div>
    )
}

export default RegisterUser
