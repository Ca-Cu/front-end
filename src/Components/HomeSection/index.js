import React from 'react';
import {
    HeroContainer,
    HeroBg,
    HeroContent,
    HeroP,
    HeroH1,
    HeroContentWrapper,
    HColumn1,
    HColumn2,
    HeroRow,
    Button,
    HeroBtnWrapper
} from './LoginElements';
import './LoginFormElements.css';
import people from './../../img/background.jpg';
const HomeSection = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('nombres');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('tipousuario');
    localStorage.removeItem('correo');
    return (
        <HeroContainer id="home">   
            <HeroContent>
                <HeroContentWrapper>
                <HeroRow>
                    <HColumn1>
                        <HeroH1>Llego el momento de cuidarte !</HeroH1>
                        <HeroP> 
                           Nunca es tarde para cuidar tu salud !!,el Cancer de Cuello Uterino
                           puede afectarte en cualquier momento de tu vida, es por ello que
                            hemos diseñado esta herramienta para ti 
                        </HeroP>
                        <HeroBtnWrapper>
                            <Button  to='/Register'>Registrarse</Button>
                        </HeroBtnWrapper>
                    </HColumn1>
                    <HColumn2>
                        <img src="./backgroundHERO.png" heigh="500px" width="500px">
                        </img>
                    </HColumn2>
                    </HeroRow>
                </HeroContentWrapper>
            </HeroContent>
        </HeroContainer>
    )
}
export default HomeSection;