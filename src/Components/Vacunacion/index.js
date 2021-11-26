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

const Formulariovacuna = () =>{

    var url = 'http://localhost:4567/getTiposVacunasVPH';
    axios.get(url, {
        responseType: "json",
    }).then((response) => {
        console.log(response.data);

    });
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
            idPaciente:localStorage.getItem("id"),
            idTipo:data.get("tipoDosis"),
            nDosis:data.get("numeroDosis")
        }
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:4567/insertPrevencionPrimaria', true);
        req.body=body;
        req.send(JSON.stringify(body));
        Swal.fire("Succes", "Vacunación registrada", "success");
    };


    return (
        <div className="RegisterComponent">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="cardVacuna">
           <Typography variant="h4" align="center" component="h1" gutterBottom></Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
           <label for="tdoc">Tipo de dosis</label>
             <select id="tipoDosis" name="tipoDosis" class="autocomplete" >
               <option value="C.C">C.C</option>
               <option value="C.E">C.E</option>
               <option value="T.I">T.I</option>
             </select>
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