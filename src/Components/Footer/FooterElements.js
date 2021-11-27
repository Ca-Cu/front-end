import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const FooterContainer = styled.div`
    background: #057878;
    height:100%;
    margin:auto;
`;

export const FooterWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
`;

export const  SocialMedia = styled.div`
    max-width: 1500px;
    width: 100%;
`;

export const SocialMediaWrap = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    max-width: 1200px;
    margin: 25px  auto 0 auto;
    @media screen and (max-width: 520px){
        flex-direction: column;
    }
`;

export const SocialLogo = styled.big`
    color: #fff;
    justify-self: start;
    text-decoration: none;
    font-size: 1.5 rem;
    display:flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`;

export const  WebSiteRight = styled.small`
    color: #fff;
    margin-bottom:  16px;
`;