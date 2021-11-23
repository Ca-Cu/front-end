import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Rightbar from '../../Components/Rightbar';
import {useParams} from 'react-router';
import React,{useState,useEffect} from 'react'
import RegisterUser from  '../../Components/RegisterUser';
import { Users } from "../../testData";
import Swal from "sweetalert2";
import './resident.css';

const ResidentDashboard = () => {
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));    
    const [section, setSection] = useState('');
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
     }
     useEffect(() => {
        const fetchUser = async () => {
        if (localStorage.getItem('id')==null || localStorage.getItem('tipousuario')!="Paciente") {
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
            case 'crearUsuario':
              localStorage.setItem('change','yes');
              return <RegisterUser/>;
            case 'Feed':
              return <Feed/>;
            default:
              return <Feed/>;
         }
     }

    return (
        <div className="residentContainer">
            <Leftbar changeSection={changeSection}/>
            {switchSection(section)}
            <Rightbar/>
        </div>
    )
}

export default ResidentDashboard;
