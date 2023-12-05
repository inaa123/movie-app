//클릭할때마다 영화에 대한 정보가 달라지는 박스가 보여질 것

import React from 'react'
import styled from 'styled-components'
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

function OverView({movie, setIsClick}) { //Action에서 OverView movie={isClick} movie로 넘겼으니 {movie}를 받아온다. movie안엔 여러 객체가 담겨있다. 필요한거 뽑아서 사용
    return (
        <HoverContainer class='overview'> {/*전체 투명한(opacity) 배경*/}
            {/*받아온 영화의 정보, video img등 가 들어가야함 */}
            <HoverWrapper> {/*영화 상세정보 박스 */}
                <CloseBtn onClick={()=>setIsClick(false)}> {/*onClick을 하면 닫힌다. 외부(Action)에서 열려있던 애를 닫아야 하기 때문에 Action하고 연결되어야함*/}
                    <MdClose />
                </CloseBtn>
                {/* movie.id를 전달시켜줌. */}
                <Link to={`/movie/${movie.id}`}> 
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
                </Link>
                <HoverText>
                    <h1>{movie.title}</h1>
                </HoverText>
            </HoverWrapper>
            
        </HoverContainer>
    )
}

export default OverView

const HoverContainer = styled.div`
    width: 100vw;
    /* height: 100vh; */
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto; //스크롤 생기면 아래로 생기도록
    z-index: 999;
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const HoverWrapper = styled.div`
    max-width: 50%;
    height: auto;
    background: gray;
    position: relative;
    border-radius : 10px;
    overflow:hidden;
`

const CloseBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: black;
    position: absolute;
    top: 30px;
    right: 30px; //우측상단에 붙임
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 30px;
        height: 30px;
        path{
            color: #fff;
        }
    }
    
`
const HoverText = styled.div`
    padding: 30px;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    background: gray;
`