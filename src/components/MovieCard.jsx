import React from 'react'
import { IoMdPlay, IoIosArrowDown } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { SlLike } from "react-icons/sl";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//MovieCard는 MovieList - Action, Comedy.jsx에서 이미지 hover하면 해당 요소의 정보들이 뜬다.(장르 숫자 -> 문자로 전환)
function MovieCard({movie, genreText}) {//movie,genreText 요소를 받아온다. hover한 영화의 정보를 moviecard에 넘겨준 것

    //const {title, backdrop_path, genre_id} = movie; //받아온 title, backdrop_path, genredId를 movie 에 묶어둔다. hover시 추가됨
    //genresId받아오는 애 없어서 map오류 남

    const navigate = useNavigate(); //링크로 이동시켜주는 요소다.

    const overViewEvent = () => {
        //링크 이동은 index.js에 있는 path: 'movie/:movieId'경로를 알려줘야 페이지가 넘어간다. 그래서 여기 navigate에서도 movie/${movie.id}를 받아와 이동시켜줘야 한다.(클릭시)
        navigate(`movie/${movie.id}`)//링크이동(MovieDetail로)
    }

    return (
        <MovieItem onClick = {overViewEvent}>
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
        /* position: absolute;
        top: 0;
        left: 0; */
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