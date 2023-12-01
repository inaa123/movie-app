import React from 'react';
import {Link} from 'react-router-dom';
import { RiNetflixFill } from "react-icons/ri";
import styled from 'styled-components';
import Navigation from './Navigation';
import Search from './Search';

function Header() {
    return (
        <HeaderContainer>
            <h1 className='logo'><Link to='/'><RiNetflixFill /></Link></h1>
            <Navigation/> {/*컴포넌트로 */}
            <HeaderRight> {/*styled로.*/}
                <Search/> {/*컴포넌트로 */}
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    padding : 16px 32px;
    box-sizing: border-box;
    background: black;
    width: 100%;
    gap: 48px;
    .logo{
        font-size: 30px;
        
        a{ //Link가 a태그, babel이 htmtl인식할 수 있게 컴파일 해준다.
            display: flex;
            align-items: center;
            path{ //로고이미지에 컬러 주고 싶으면 svg가 아닌 path에 줘야한다.
                color: red;
            }
        }
        
    }
`

const HeaderRight = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`
