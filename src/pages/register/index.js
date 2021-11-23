import React from 'react'
import RegisterUser from "../../Components/RegisterUser"
import Grid from '@mui/material/Grid';
import "./register.css";
import Navigbar from '../../Components/Navigbar-landing';
import Footer from '../../Components/Footer';
const Register = () => {
    return (
        <div>
            <Navigbar/>
            <div class="HeroContainer" id="home">
                <div class="HeroContent HeroContainer:before">
                    <div class="HeroRow">
                        <div class="HColumn1">
                             <img src="./register.png" heigh="480px" width="480px"></img>
                        </div>
                        <div class="HColumn2">
                            <RegisterUser />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register
