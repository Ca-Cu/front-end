import React from 'react'

import {    
    UpperContainer,
    UpperWrap,
    UpperSocialMedia,
    UpperSocialMediaWrap,
    UpperSocialLogo

} from './NavigbarElements';
const Navbar = () => {
    return (
        <UpperContainer>
            <UpperWrap>
                <UpperSocialMedia>
                    <UpperSocialMediaWrap>
                        <UpperSocialLogo >{localStorage.getItem('ubicacion')}</UpperSocialLogo>
                    </UpperSocialMediaWrap>
                </UpperSocialMedia>
            </UpperWrap>
        </UpperContainer>
    )
}

export default Navbar