import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import RegisterUser from  '../../Components/RegisterUser';
import Rightbar from '../../Components/Rightbar';
import React,{useState,useEffect,useRef} from 'react'
import { Users } from "../../testData";
import './admin.css';

import axios from 'axios';
import Swal from "sweetalert2";
const AdminDashboard = () => {
    const [user, setUser] = useState({});
    const [section, setSection] = useState('Feed');
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
     }
    const switchSection = (param) =>{
        switch(param) {
            case 'crearUsuario':
              return <RegisterUser/>;
            case 'Feed':
                    return <Feed/>;
            default:
              return <Feed/>;
          }
     }
    return (
        <div className="adminContainer">
            <Leftbar user={currentUser} changeSection={changeSection}/>
            {switchSection(section)
            }
            <Rightbar/>   
        </div>
    )
}

export default AdminDashboard;
