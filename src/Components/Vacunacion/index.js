import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import './vacunacion.css';
import Swal from "sweetalert2";

const Vacunacion = () =>{
    var noEdita;
    var disabled;
    var tdoc=""
    var documento=""
    var estadocivil=""
    var nombres="";
    var apellidos="";
    var fechadenacimiento="";
    var paisdeorigen="";
    var departamentodeorigen="";
    var municipiodeorigen="";
    var paisderesidencia="";
    var departamentoderesidencia="";
    var municipioderesidencia="";
    var direccionderesidencia="";
    var niveleducativo="";
    var regimendesalud="";
    var eps="";
    var email="";
    var password="";
    console.log((window.location.href).split("/")[3]);

    if((window.location.href).split("/")[3]!='Dashboard'){
        localStorage.removeItem('id');
        localStorage.removeItem('nombres');
        localStorage.removeItem('apellidos');
        localStorage.removeItem('tipousuario');
        localStorage.removeItem('correo');
        noEdita=false;
        disabled=false;
    }else if((window.location.href).split("/")[3]=='Dashboard'){
        var url = 'http://localhost:4567/getUsuarioById?id='+localStorage.getItem('id');
        axios.get(url, {
            responseType: "json",
        }).then((response) => {
            console.log(response.data);
            apellidos=response.data["apellidos"]
            console.log(apellidos);

        });

        noEdita=true;
        disabled="disabled";
    }
    var url='http://localhost:4567/insertUsuario/';
    const handleChange = e => {
        const {name, value } = e.target;
    };
    const [open, setOpen] = useState(false);

    let history = useHistory();

    const handleSubmit = (e) => {
        let body={}
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        var d = new Date();
        body={
            tdoc:data.get("tdoc"),
            ndoc:data.get("ndoc"),
            nombres:data.get("nombres"),
            apellidos:data.get("apellidos"),
            fechaderegistro: d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                              ("0" + d.getDate()).slice(-2),
            nacionalidad:data.get("paisdeorigen"),
            departamentodeorigen:data.get("departamentodeorigen"),
            municipiodeorigen:data.get("municipiodeorigen"),
            paisderesidencia:data.get("paisderesidencia"),
            departamentoderesidencia:data.get("departamentoderesidencia"),
            municipioderesidencia:data.get("municipioderesidencia"),
            direccionderesidencia:data.get("direccionderesidencia"),
            fechadenacimiento:data.get("fechadenacimiento"),
            estadocivil:data.get("estadocivil"),
            niveleducativo:data.get("niveleducativo"),
            regimendesalud:data.get("regimendesalud"),
            eps:data.get("eps"),
            correo:data.get("email"),
            tipousuario:"Paciente"
        }
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:4567/insertUsuario', true);
        req.body=body;
        req.send(JSON.stringify(body));
        e.preventDefault();
        let redirect =''
        redirect='/'
        console.log(redirect)
        history.push(redirect);
    };


    return (
        <div className="RegisterComponent">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" component="h1" gutterBottom></Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
           <label for="tdoc">Tipo de documento</label>
             <select id="tdoc" name="tdoc" class="autocomplete" disabled={disabled}>
               <option value="C.C">C.C</option>
               <option value="C.E">C.E</option>
               <option value="T.I">T.I</option>
             </select>
            <TextField
                    required
                    id="ndoc"
                    name="ndoc"
                    label="numero de Documento"
                    variant="outlined"
                    type="number"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            <label for="estadocivil">Estado civil</label>
            <select id="estadocivil" name="estadocivil" class="autocomplete" >
               <option value="Casado">Casado</option>
               <option value="Divorciado">Divorciado</option>
               <option value="Soltero">Soltero</option>
               <option value="Unión libre">Unión libre</option>
               <option value="Viudo">Viudo</option>
             </select>
             </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" >
            <TextField
                    required
                    id="nombres"
                    name="nombres"
                    label="Nombres completos"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />

            <TextField
                    required
                    id="apellidos"
                    name="apellidos"
                    label="Apellidos completos"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            <TextField
                    required
                    id="fechadenacimiento"
                    name="fechadenacimiento"
                    type="date"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="paisdeorigen"
                    name="paisdeorigen"
                    label="País de origen"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            <TextField
                    required
                    id="departamentodeorigen"
                    name="departamentodeorigen"
                    label="Departamento de origen"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            <TextField
                    required
                    id="municipiodeorigen"
                    name="municipiodeorigen"
                    label="Municipio de origen"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="paisderesidencia"
                    name="paisderesidencia"
                    label="País de residencia"
                    variant="outlined"
                    />
            <TextField
                    required
                    id="departamentoderesidencia"
                    name="departamentoderesidencia"
                    label="Departamento de residencia"
                    variant="outlined"
                    />
            <TextField
                    required
                    id="municipioderesidencia"
                    name="municipioderesidencia"
                    label="Municipio de residencia"
                    variant="outlined"
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                required
                id="direccionderesidencia"
                name="direccionderesidencia"
                label="Direccion de residencia"
                variant="outlined"
            />
            <TextField
                    required
                    id="niveleducativo"
                    name="niveleducativo"
                    label="Nivel educativo"
                    variant="outlined"
                    />
            <TextField
                required
                id="regimendesalud"
                name="regimendesalud"
                label="Regimen de salud"
                variant="outlined"
                />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">

            <TextField
                    required
                    id="eps"
                    name="eps"
                    label="eps"
                    variant="outlined"
                    />
            <TextField
                    required
                    id="email"
                    name="email"
                    label="correo"
                    variant="outlined"
                    type="email"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    />
            <TextField
                    required
                    id="password"
                    name="password"
                    label="contraseña"
                    variant="outlined"
                    type="password"
                    />
            </Stack>
            <br/>
            <Box textAlign='center'>
                <Button  type="submit" class="button" variant="contained" endIcon={<SendIcon />}>Confirmar</Button>

            </Box>
        </Box>
        </div>
    )
}
export default Vacunacion