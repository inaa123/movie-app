import React from 'react'
import { IoMdPlay } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { SlLike } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import styled from 'styled-components';

function MovieCard({movie, genreText, onClick}) {//movie,genreText 요소를 받아온다. hover한 영화의 정보를 moviecard에 넘겨준 것

    //const {title, backdrop_path} = movie; //받아온 title, backdrop_path, genredId를 movie 에 묶어둔다. hover시 추가됨
    
    return (
        <MovieItem onClick = {()=>onClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
            <Content className="addi-content"> {/*이미지만 보이다가 hover시 Content요소가 나타나도록*/}
                <p>{movie.title}</p>
                <div className='btn-wrapper'>
                    <button class='btn1'><IoMdPlay /></button>
                    <button class='btn2'><LuPlus /></button>
                    <button class='btn3'><SlLike/></button>
                    <button class='btn4'><IoIosArrowDown/></button>
                </div>
                <div className='genres-wrapper'>
                    <span>{genreText}</span>
                </div>
            </Content>
        </MovieItem>
    )
}

export default MovieCard

const MovieItem = styled.div`
    flex-shrink: 0; //줄어들지 않게
    position: relative;
    transition: 500ms;
    img{
        width: 100%;
        display: block;
    }
    &:hover{ //hover시 커지게
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(1.3);
        z-index: 10;
        .addi-content{
            opacity: 1;
            position: relative;
            z-index: 99;
        }
    }
`

const Content = styled.div`
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    background: gray;
    color: white;
    transition: 500ms;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    opacity: 0;
    p{
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-150%);
        font-size: 30px;
        opacity: 0;
        transition: 300ms 1000ms; //1초 있다 나오게
    }
    .btn-wrapper{
        display: flex;
        gap: 20px;
        button{
            width: 35px;
            height: 35px;
            border-radius: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            svg{
                width: 15px;
                height: 15px;
                path{
                color: black;
                }
            }
            
            &.btn4{
                margin-left: auto;
            }
        }
    }
`