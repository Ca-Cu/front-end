import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const UpperContainer = styled.div`
    background: #057878;
    z-index:5;
`;

export const UpperWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    margin-left:20px;
`;

export const  UpperSocialMedia = styled.div`
    max-width: 1500px;
    width: 100%;
    margin-left:20px;
`;

export const UpperSocialMediaWrap = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    max-width: 1200px;
    margin: 25px  auto 0 auto;
    @media screen and (max-width: 520px){
        flex-direction: column;
    }
    margin-left:20px;
`;

export const UpperSocialLogo = styled.big`
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 1.5 rem;
    margin-bottom: 16px;
    font-weight: bold;
    margin-left:20px;
`;
