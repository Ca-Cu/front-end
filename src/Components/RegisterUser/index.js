import React,{useState,useEffect, useCallback} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import './registerUser.css';
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Navbar from '../Navigbar';
import { ExitToApp } from 'material-ui-icons';

const bcrypt = require("bcryptjs");
const rondas = 15;
const RegisterUser = () =>{
    const [data,setData] = useState([]);
    var noEdita=false;
    var disabled=false;

    const [current,setCurrent] = useState({});
    const handleOnChange = (name, value) => {
        setCurrent({
            ...current,[name]:value
        });
      };
    const toggleCurrent =(event)=>{
        console.log(event.target.value)
        handleOnChange(event.target.name,event.target.value)
    }
    const fetchData = useCallback(async () => {
        var url = 'http://localhost:4567/getUsuarioById?id='+localStorage.getItem('id');
        await axios.get(url
        )
        .then( (res) =>{  
            setCurrent(res.data)
            console.log(data)
            console.log(res.data)
            let dr = data.id
            console.log(dr)
        }).catch(
            e =>{console.log("Error: :c "+e)}
        )
        },[])
    useEffect(()=>{
        fetchData()
    },[fetchData])
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
        bcrypt.hash(data.get("password"), rondas, (err, palabraSecretaEncriptada) => {
            body={}
            if((window.location.href).split("/")[3]=='Register' || localStorage.getItem('ubicacion')=='Crear doctor'){
                var TipoUsuario;
                if((window.location.href).split("/")[3]=='Register'){
                    TipoUsuario="Paciente";
                }else{
                    TipoUsuario="Doctor";
                }
                body={
                    tdoc:current.tdoc,
                    ndoc:current.ndoc,
                    nombres:current.nombres,
                    apellidos:current.apellidos,
                    fechaderegistro: d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                                      ("0" + d.getDate()).slice(-2),
                    nacionalidad:current.nacionalidad,
                    departamentodeorigen:current.departamentodeorigen,
                    municipiodeorigen:current.municipiodeorigen,
                    paisderesidencia:current.paisderesidencia,
                    departamentoderesidencia:current.departamentoderesidencia,
                    municipioderesidencia:current.municipioderesidencia,
                    direccionderesidencia:current.direccionderesidencia,
                    fechadenacimiento:current.fechadenacimiento,
                    estadocivil:current.estadocivil,
                    niveleducativo:current.niveleducativo,
                    regimendesalud:current.regimendesalud,
                    eps:current.eps,
                    correo:current.correo,
                    contraseña:palabraSecretaEncriptada,
                    tipousuario:TipoUsuario
                }
                console.log(body);
                // var req = new XMLHttpRequest();
                // req.open('POST', 'http://localhost:4567/insertUsuario', true);
                // req.body=body;
                // req.send(JSON.stringify(body));
                // Swal.fire("Succes", "Usuario creado exitosamente", "success").then(()=>{
                //     if(TipoUsuario=="Paciente"){
                //         e.preventDefault();
                //         let redirect =''
                //         redirect='/'
                //         console.log(redirect)
                //         history.push(redirect);
                //     }
                // });

            }
            else if(localStorage.getItem('ubicacion')=='Editar usuario'){
                body={
                    id:localStorage.getItem("id"),
                    paisderesidencia:data.get("paisderesidencia"),
                    departamentoderesidencia:data.get("departamentoderesidencia"),
                    municipioderesidencia:data.get("municipioderesidencia"),
                    direccionderesidencia:data.get("direccionderesidencia"),
                    estadocivil:data.get("estadocivil"),
                    niveleducativo:data.get("niveleducativo"),
                    regimendesalud:data.get("regimendesalud"),
                    eps:data.get("eps"),
                    contraseña:palabraSecretaEncriptada
                }
                var req = new XMLHttpRequest();
                req.open('POST', 'http://localhost:4567/putUsuario', true);
                req.body=body;
                req.send(JSON.stringify(body));
            }

        })

    };


    return (
        <div className="RegisterComponent">
        <Navbar/>    
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" component="h1" gutterBottom></Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
             <FormControl style={{minWidth: 100}}>
            <InputLabel id="demo-simple-select-label">{current.tdoc}</InputLabel>
            <Select
                labelId="tdoc"
                id="tdoc"
                value={current.tdoc}
                helperText="Numero de documento"
                size="small"
                onChange={toggleCurrent}
            >
                <MenuItem value={10}>C.C</MenuItem>
                <MenuItem value={20}>C.E</MenuItem>
                <MenuItem value={30}>T.I</MenuItem>
            </Select>
            </FormControl>
            <TextField multiline={true}
                    required
                    id="ndoc"
                    name="ndoc"
                    helperText="numero de Documento"
                    variant="outlined"
                    type="number"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    value={current.ndoc}
                    size="small"
                    onChange={toggleCurrent}
                    />
             <FormControl style={{minWidth: 120}} >
            <InputLabel id="demo-simple-select-label">{current.estadocivil}</InputLabel>
            <Select
                labelId="estadocivil"
                id="estadocivil"
                value={current.estadocivil}
                onChange={toggleCurrent}
                label="Estado civil"
                size="small"
            >
                <MenuItem value={10}>Casado</MenuItem>
                <MenuItem value={20}>Divorciado</MenuItem>
                <MenuItem value={30}>Soltero</MenuItem>
                <MenuItem value={40}>Unión libre</MenuItem>
                <MenuItem value={50}>Viudo</MenuItem>
            </Select>
            </FormControl>
             </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" >
            <TextField
                    required
                    id="nombres"
                    name="nombres"
                    helperText="Nombres completos"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    size="small"
                    value={current.nombres}
                    onChange={toggleCurrent}
                    />

            <TextField
                    required
                    id="apellidos"
                    name="apellidos"
                    helperText="Apellidos completos"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    size="small"
                    value={current.apellidos}
                    onChange={toggleCurrent}
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
                    size="small"
                    value={current.fechadenacimiento}
                    onChange={toggleCurrent}
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="paisdeorigen"
                    name="nacionalidad"
                    helperText="País de origen"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    size="small"
                    value={current.nacionalidad}
                    onChange={toggleCurrent}
                    />
            <TextField
                    required
                    id="departamentodeorigen"
                    name="departamentodeorigen"
                    helperText="Departamento de origen"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    size="small"
                    value={current.departamentodeorigen}
                    onChange={toggleCurrent}
                    />
            <TextField
                    required
                    id="municipiodeorigen"
                    name="municipiodeorigen"
                    helperText="Municipio de origen"
                    variant="outlined"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    size="small"
                    value={current.municipiodeorigen}
                    onChange={toggleCurrent}
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="paisderesidencia"
                    name="paisderesidencia"
                    helperText="País de residencia"
                    variant="outlined"
                    value={current.paisderesidencia}
                    onChange={toggleCurrent}
                    size="small"
                    />
            <TextField
                    required
                    id="departamentoderesidencia"
                    name="departamentoderesidencia"
                    helperText="Departamento de residencia"
                    variant="outlined"
                    value={current.departamentoderesidencia}
                    onChange={toggleCurrent}
                    size="small"
                    />
            <TextField
                    required
                    id="municipioderesidencia"
                    name="municipioderesidencia"
                    helperText="Municipio de residencia"
                    variant="outlined"
                    value={current.municipioderesidencia}
                    onChange={toggleCurrent}
                    size="small"
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                required
                id="direccionderesidencia"
                name="direccionderesidencia"
                helperText="Direccion de residencia"
                variant="outlined"
                value={current.direccionderesidencia}
                onChange={toggleCurrent}
                size="small"
            />
            <TextField
                    required
                    id="niveleducativo"
                    name="niveleducativo"
                    helperText="Nivel educativo"
                    variant="outlined"
                    value={current.niveleducativo}
                    onChange={toggleCurrent}
                    size="small"
                    />
            <TextField
                required
                id="regimendesalud"
                name="regimendesalud"
                helperText="Regimen de salud"
                variant="outlined"
                value={current.regimendesalud}
                onChange={toggleCurrent}
                size="small"
                />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">

            <TextField
                    required
                    id="eps"
                    name="eps"
                    helperText="eps"
                    variant="outlined"
                    value={current.eps}
                    onChange={toggleCurrent}
                    size="small"
                    />
            <TextField
                    required
                    id="email"
                    name="correo"
                    helperText="correo"
                    variant="outlined"
                    type="email"
                    inputProps={{
                        readOnly: noEdita,
                        disabled: noEdita,
                    }}
                    value={current.correo}
                    onChange={toggleCurrent}
                    size="small"
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
export default RegisterUser
