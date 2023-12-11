//클릭할때마다 영화에 대한 정보가 달라지는 박스가 보여질 것 - 페이지 넘어가는 게 아니라 오버랩되면서 위에 얹어지는 형식 -> 클릭하면 OverView컴포넌트를 불러온다.

import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

function OverView({setIsClick, title, movieId, backdrop_path , overview}) { 
//function OverView({movie}){ Action에서 OverView movie={isClick} movie로 넘겼으니 {movie}를 받아온다. movie안엔 여러 객체가 담겨있다. 필요한거 뽑아서 사용
//overview는 줄거리임
    const [isVisible, setIsVisible] = useState(false);
    const overViewRef = useRef(null)

    return (
        <HoverContainer ref={overViewRef} className={`overview ${isVisible ? 'visible' : ''}`}> {/* HoverContainer : 전체 투명한(opacity), className은 overview와 isVisible이면 visible, 아니면 x 배경*/}
            {/*받아온 영화의 정보, video img등 가 들어가야함 */}
            <HoverWrapper> {/*영화 상세정보 박스 */}
                <CloseBtn onClick={()=>setIsClick(false)}> {/*onClick을 하면 닫힌다. 외부(Action)에서 열려있던 애를 닫아야 하기 때문에 Action하고 연결되어 있어야 함*/}
                    <MdClose />
                </CloseBtn>
                {/* movie.id를 전달시켜줌. */}
                <Link to={`/movie/${movieId}`}>
                    {/* 이미지 클릭하면 상세페이지(넷플에선 영상재생), 이미지에만 Link를 건다.*/}
                    <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
                    
                </Link>
                <HoverText>
                    <h1>{title}</h1>
                    <p>{overview}</p>
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
    overflow-y: auto; //fixed여도 스크롤 생기면 y축에 생기도록
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