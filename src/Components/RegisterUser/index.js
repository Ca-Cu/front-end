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

const bcrypt = require("bcryptjs");
const rondas = 15;
const RegisterUser = () =>{
    const [data,setData] = useState([]);
    const [noEdita,setNoEdita] = useState();
    const [disabled,setDisabled] = useState();

    const [current,setcurrent] = useState({});
    const handleOnChange = (name, value) => {
        setcurrent({
            ...current,[name]:value
        });
      };
    const togglecurrent =(event)=>{
        console.log(event.target.value)
        handleOnChange(event.target.name,event.target.value)
    }
    const fetchData = useCallback(async () => {
        if((window.location.href).split("/")[3]=='Register'){
            localStorage.removeItem('id');
            localStorage.removeItem('nombres');
            localStorage.removeItem('apellidos');
            localStorage.removeItem('tipousuario');
            localStorage.removeItem('correo');
        }else if(localStorage.getItem('ubicacion')=='Editar usuario'){
            setNoEdita(true);
            setDisabled("disabled");
            var url = 'http://localhost:4567/getUsuarioById?id='+localStorage.getItem('id');
            await axios.get(url
            )
            .then( (res) =>{  
                setcurrent(res.data)
                console.log(data)
                console.log(res.data)
                let dr = data.id
                console.log(dr)
            }).catch(
                e =>{console.log("Error: :c "+e)}
            )
        }
       
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
        bcrypt.hash(data.get("contraseña"), rondas, (err, palabraSecretaEncriptada) => {
            body={}
            console.log(palabraSecretaEncriptada)
            if((window.location.href).split("/")[3]=='Register' || localStorage.getItem('ubicacion')=='Crear doctor'){
                var TipoUsuario;
                if((window.location.href).split("/")[3]=='Register'){
                    TipoUsuario="Paciente";
                }else{
                    TipoUsuario="Doctor";
                }
                console.log(current)
                body={

                    tdoc:current?.tdoc,
                    ndoc:current?.ndoc,
                    nombres:current?.nombres,
                    apellidos:current?.apellidos,
                    fechaderegistro: d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                                      ("0" + d.getDate()).slice(-2),
                    nacionalidad:current?.nacionalidad,
                    departamentodeorigen:current?.departamentodeorigen,
                    municipiodeorigen:current?.municipiodeorigen,
                    paisderesidencia:current?.paisderesidencia,
                    departamentoderesidencia:current?.departamentoderesidencia,
                    municipioderesidencia:current?.municipioderesidencia,
                    direccionderesidencia:current?.direccionderesidencia,
                    fechadenacimiento:current?.fechadenacimiento,
                    estadocivil:current?.estadocivil,
                    niveleducativo:current?.niveleducativo,
                    regimendesalud:current?.regimendesalud,
                    eps:current?.eps,
                    correo:current?.correo,
                    contraseña:palabraSecretaEncriptada,
                    tipousuario:TipoUsuario
                }
                console.log(body);
                var req = new XMLHttpRequest();
                req.open('POST', 'http://localhost:4567/insertUsuario', true);
                req.body=body;
                req.send(JSON.stringify(body));
                Swal.fire("Succes", "Usuario creado exitosamente", "success").then(()=>{
                    if(TipoUsuario=="Paciente"){
                        e.preventDefault();
                        let redirect =''
                        redirect='/'
                        console.log(redirect)
                        history.push(redirect);
                    }
                });

            }
            else if(localStorage.getItem('ubicacion')=='Editar usuario'){
                body={
                    id:localStorage.getItem("id"),
                    paisderesidencia:current?.paisderesidencia,
                    departamentoderesidencia:current?.departamentoderesidencia,
                    municipioderesidencia:current?.municipioderesidencia,
                    direccionderesidencia:current?.direccionderesidencia,
                    estadocivil:current?.estadocivil,
                    niveleducativo:current?.niveleducativo,
                    regimendesalud:current?.regimendesalud,
                    eps:current?.eps,
                }
                console.log(body)
                var req = new XMLHttpRequest();
                req.open('POST', 'http://localhost:4567/putUsuario', true);
                req.body=body;
                req.send(JSON.stringify(body));
            }

        })

    };


    return (
        <div className="RegisterComponent">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" component="h1" gutterBottom></Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
             <FormControl style={{minWidth: 100}} disabled={disabled}>
            <InputLabel  disabled={disabled}>{current?.tdoc}</InputLabel>
            <Select
                labelId="tdoc"
                id="tdoc"
                name="tdoc"
                value={current?.tdoc}
                helperText="Numero de documento"
                size="small"
                onChange={togglecurrent}
            >
                <MenuItem value="C.C">C.C</MenuItem>
                <MenuItem value="C.E">C.E</MenuItem>
                <MenuItem value="T.I">T.I</MenuItem>
            </Select>
            </FormControl>
            <TextField multiline={true}
                    required={!noEdita}
                    id="ndoc"
                    name="ndoc"
                    helperText="numero de Documento"
                    variant="outlined"
                    type="number"
                    disabled={noEdita}
                    value={current?.ndoc}
                    size="small"
                    onChange={togglecurrent}
                    />
             <FormControl style={{minWidth: 120}} >
            <InputLabel id="demo-simple-select-label" required focused={true} >{current?.estadocivil}</InputLabel>
                <Select
                    labelId="estadocivil"
                    id="estadocivil"
                    name="estadocivil"
                    value={current?.estadocivil}
                    onChange={togglecurrent}
                    label="Estado civil"
                    size="small"
                >
                <MenuItem value="Casado">Casado</MenuItem>
                <MenuItem value="Divorciado">Divorciado</MenuItem>
                <MenuItem value="Soltero">Soltero</MenuItem>
                <MenuItem value="Unión libre">Unión libre</MenuItem>
                <MenuItem value="Viudo">Viudo</MenuItem>
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
                    disabled={noEdita}
                    size="small"
                    value={current?.nombres}
                    onChange={togglecurrent}
                    />

            <TextField
                    required
                    id="apellidos"
                    name="apellidos"
                    helperText="Apellidos completos"
                    variant="outlined"
                    disabled={noEdita}
                    size="small"
                    value={current?.apellidos}
                    onChange={togglecurrent}
                    color="primary"
                    />
             <TextField
                    id="email"
                    name="correo"
                    helperText="correo"
                    variant="outlined"
                    type="email"
                    disabled={noEdita}
                    value={current?.correo}
                    onChange={togglecurrent}
                    size="small"
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
                    disabled={noEdita}
                    size="small"
                    value={current?.nacionalidad}
                    onChange={togglecurrent}
                    />
            <TextField
                    required
                    id="departamentodeorigen"
                    name="departamentodeorigen"
                    helperText="Departamento de origen"
                    variant="outlined"
                    disabled={noEdita}
                    size="small"
                    value={current?.departamentodeorigen}
                    onChange={togglecurrent}
                    />
            <TextField
                    required
                    id="municipiodeorigen"
                    name="municipiodeorigen"
                    helperText="Municipio de origen"
                    variant="outlined"
                    disabled={noEdita}
                    size="small"
                    value={current?.municipiodeorigen}
                    onChange={togglecurrent}
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
                    value={current?.paisderesidencia}
                    onChange={togglecurrent}
                    size="small"
                    focused={noEdita}
                    />
            <TextField
                    required
                    id="departamentoderesidencia"
                    name="departamentoderesidencia"
                    helperText="Departamento de residencia"
                    variant="outlined"
                    value={current?.departamentoderesidencia}
                    onChange={togglecurrent}
                    size="small"
                    focused={noEdita}
                    />
            <TextField
                    required
                    id="municipioderesidencia"
                    name="municipioderesidencia"
                    helperText="Municipio de residencia"
                    variant="outlined"
                    value={current?.municipioderesidencia}
                    onChange={togglecurrent}
                    size="small"
                    focused={noEdita}
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
                value={current?.direccionderesidencia}
                onChange={togglecurrent}
                size="small"
                focused={noEdita}
            />
            <TextField
                    required
                    id="niveleducativo"
                    name="niveleducativo"
                    helperText="Nivel educativo"
                    variant="outlined"
                    value={current?.niveleducativo}
                    onChange={togglecurrent}
                    size="small"
                    focused={noEdita}
                    />
            <TextField
                required
                id="regimendesalud"
                name="regimendesalud"
                helperText="Regimen de salud"
                variant="outlined"
                value={current?.regimendesalud}
                onChange={togglecurrent}
                size="small"
                focused={noEdita}
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
                    value={current?.eps}
                    onChange={togglecurrent}
                    size="small"
                    focused={noEdita}
                    />
            {
                (!noEdita)?
                <div>
                <TextField
                required
                id="fechadenacimiento"
                name="fechadenacimiento"
                type="date"
                variant="outlined"
                disabled={noEdita}
                onChange={togglecurrent}
                />
                </div>
                :<div></div>
            }
            {
                (!noEdita)?
                <div>
            <TextField
                required
                id="contraseña"
                name="contraseña"
                label="contraseña"
                variant="outlined"
                type="password"
                size="small"
                helperText="contraseña"
                onChange={togglecurrent}
                />
                </div>
                :<div></div>
            }
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
