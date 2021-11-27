import React,{useState,useEffect, useCallback} from 'react'
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
import Navbar from '../Navigbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Formulariovacuna = () =>{
    const [datas,setData] = useState([]);
    const [tipoDosis,setTipoDosis] = useState();
    const toggleTipo=(idTipo)=>{
        setTipoDosis(idTipo)
    }   
    const fetchData = useCallback(async () => {
        var url = 'http://localhost:4567/getTiposVacunasVPH';
        await axios.get(url
        )
        .then( (res) =>{  
            setData(res.data)

        }).catch(
            e =>{console.log("Error: :c "+e)}
        )
        },[])
    useEffect(()=>{
        fetchData()
    },[fetchData])
    const handleChange = e => {
        const {name, value } = e.target;
    };
    const [open, setOpen] = useState(false);

    let history = useHistory();

    const handleSubmit = (e) => {
        let body={}
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(data);
        var d = new Date();
        body={
            idPaciente:localStorage.getItem("id"),
            idTipo:tipoDosis,
            nDosis:data.get("numeroDosis")
        }
        console.log(body)
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:4567/insertPrevencionPrimaria', true);
        req.body=body;
        req.send(JSON.stringify(body));
        Swal.fire("Succes", "Vacunación registrada", "success");
    };


    return (
        <div className="RegisterComponent_vacuna">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="cardVacuna">
           <Typography variant="h4" align="center" component="h1" gutterBottom></Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
           <FormControl style={{minWidth: 150}}>
            <InputLabel id="simple-select-label">Tipo de Dosis</InputLabel>
            <Select
                required
                labelId="tipoDosis"
                id="tipoDosis"
                helperText="Tipo de Dosis"
                >
                    {
                        datas.map((element)=>{
                            return(
                            <MenuItem key={element.id} value={element.id}
                            onClick= {(e)=>{toggleTipo(element.id)}}
                            >{element.nombre}</MenuItem>
                            )
                        })
                    }
            </Select>
            </FormControl>
            </Stack>
            <br/>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                required
                id="numeroDosis"
                name="numeroDosis"
                type="number"
                label="Cantidad de dosis"
                variant="outlined"
            />
            </Stack>
            <br/>
            <Box textAlign='center'>
                <Button  type="submit" class="buttonVacuna" variant="contained" endIcon={<SendIcon />}>Confirmar</Button>

            </Box>
        </Box>
        </div>
    )
}
export default Formulariovacuna