import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Home from '../home';
import Footer from '../../Components/Footer';
import {useParams} from 'react-router';
import React,{useState,useEffect} from 'react'
import RegisterUser from  '../../Components/RegisterUser';
import { Users } from "../../testData";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import Navbar from  '../../Components/Navigbar';
import CrearVacuna from  '../../Components/CrearVacuna';
import Formulariovacuna from  '../../Components/Vacunacion';
import './dashboard.css';

const ResidentDashboard = () => {
    let history = useHistory();
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));    
    const [section, setSection] = useState('');
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
     }
     useEffect(() => {
        const fetchUser = async () => {
        if (localStorage.getItem('id')==null || localStorage.getItem('tipousuario')==null) {
            await Swal.fire(
                'No está autentificado',
                'Por favor inicie sesion para usar esta funcionalidad',
                'error'
            )
            // eliminar localStorage
            // redireccionar a login
            window.location.replace("/login")
        }
        //const res = await axios.get(`/users?username=${username}`);
        console.log("current-------User")
        console.log(localStorage.getItem('nombres'))
        }
        fetchUser();
    },[]);
    const switchSection = (param) =>{
        switch(param) {
            case 'editarUsuario':
              localStorage.setItem('ubicacion','Editar usuario');
              return <RegisterUser/>;
            case 'Feed':
              localStorage.setItem('ubicacion','Información de cancer de cuello uterino');
              return <Feed/>;
            case 'Crear doctor':
              localStorage.setItem('ubicacion','Crear doctor');
              return <RegisterUser/>;
            case 'Crear vacuna':
              localStorage.setItem('ubicacion','Crear vacuna');
              return <CrearVacuna/>;
            case 'Formulario vacuna':
              localStorage.setItem('ubicacion','Registro vacuna');
              return <Formulariovacuna/>;
            case 'Home':
              console.log("/")
              history.push("/");
            default:
              localStorage.setItem('ubicacion','Información de cancer de cuello uterino');
              return <Feed/>;
         }
     }

    return (
        <div className="WeapperresidentContainer">
            <div className="residentContainer">
                <Leftbar changeSection={changeSection}/>
                {switchSection(section)}
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default ResidentDashboard;
