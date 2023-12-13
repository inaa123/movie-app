import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchActionMovies } from '../store';
import styled from 'styled-components';
import OverView from './OverView';
import MovieCard from './MovieCard';
import { fetchGenres } from '../api/api';
// import Swiper from 'swiper'; 자동 import될때 주의!! 이거 아님

//swiper
//yarn add swiper
import {Swiper, SwiperSlide} from 'swiper/react'; //스와이퍼 적용 import (swiper/react로!)
//스크립트에서 swiper를 가져오면 가지고 있던 class명자동 적용됨. 마찬가지로 Swiper와 SwiperSlide엔 자동으로 class명이 들어가 있음
import {Navigation, Pagination} from 'swiper/modules'; //모듈 import
import 'swiper/css'; //스와이퍼 기본 css 적용 import
import 'swiper/css/navigation'; //스와이퍼 좌우 버튼 기본 css
import 'swiper/css/pagination'; //스와이퍼 도트 리스트 기본 css
import '../styled/swiperCustomCss.css';



function Action() {
    const [itemSelect, setItemSelect] = useState({}); //클릭한 요소의 정보 값을 itemSelect에 담아줄것
    const [isClick, setIsClick] =  useState(false);//클릭한걸 알려주기 위함. 뭘 클릭했는지. 어떤 인덱스를 클릭햇는지에 따라서 그 안의 정보들을 넘겨줘야 하니까. / useState(false) 일단 클릭 안한 상태니 false, 클릭하면 뭔가를 받아올 것
    const [genres, setGenres] = useState({});//배열이 비어있다 배열이 들어가고 계속 채워줘야 하므로 상태변수필요(useState값 필요)
    const dispatch = useDispatch(); //생성된 action(index.jsx에서 요청한 것)의 state에 접근한 것. index.jsx의 axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&width_genres=28`)이 실행이 되면 -> reducer폴더의 index.jsx에서 state data를 쭉 받아오게 해준다. 그 전달되는 요소들은 Action이라는 장르별 컴포넌트에 담아 둔다.

    useEffect(() => { //마운트됐을 때 한번만 실행
        dispatch(fetchActionMovies())
    }, [])

    //console.log(fetchActionMovies())

    const actionData = useSelector((state) => state.action.movies, []) || []
    //useSelector : store의 상태값을 변경할 때 사용하는 요소다.
    //console.log('액션데이터' + actionData.results) //actionData에 있던 results 출력
    //actionData.results에 object로 list들이 담겨져 있다. 액션 영화에 대한 정보들이 담겨있다.

    const overViewEvent = (el) => {
        setIsClick(el)
    }
    
    const overViewClose = () => {
        setIsClick(false); //setIsClick el정보를 받아온 것을 닫으면서 비워줌 그래야 다른 애도 받아올 수있음
    }

    //장르 추가
    // useEffect(() => {
    //     const fetchGenres = async () => {
    //         try{
    //             const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=82776dd4e021405937c471b1f995902b&language=ko-KR')
    //             const data = await res.json();
    //             const genreMap = data.genres.reduce((acc,genre)=>{
    //                 acc[genre.id] = genre.name;
    // console.log(data.genres) {id: 37, name: '서부'} 등등
    //                 //console.log(genre.name) 장르이름 잘 뽑힘
                    
    //                 return acc
    //             }, {}); {}빈배열하나 넣음
                    //배열이 맨 처음엔 비어있다 계속 채워져야 하니 useState필요하다. -> genres setGenres
    //             console.log(genreMap) 전체 장르 모음
    //             setGenres(genreMap)//gnereMap(리스트, 배열)을 받아 줄 상태변수 필요해서 useState로만들어줌
                // console.log(res)
                // console.log(data) 19 개 장르들 ex id : 12, name : 모험 .....
    //         } catch(error){
    //             console.error(error);
    //         }
    //     }
    //     fetchGenres(); //한번 실행해줌(최초 마운트시 한번만 실행 [])
    // }, [])

    //장르 추가
    useEffect(() => {
        const fetchActionMovieGneres = async () => {
            dispatch(fetchActionMovies()); //fetchActionMovies()를 받아와서
            const genres = await fetchGenres(); //api.jsx의 fetchGenres를 받아온다. -> 장르 이름 받아오는
            setGenres(genres); //setGeneres에 genres를 담아준다.
        }
        fetchActionMovieGneres();
    }, [])

    const getGenreText = (genreId) => {
        //genreId를 받아와서 map으로 요소들을 만들어서 하나로 합침 
        return genreId.map((el)=>genres[el]).join()
    }

    const movieClickEvent = (movie) => { //movie값을 전달해서
        setItemSelect(movie); //setItemSelect에 보내준다. 그래야 OverView {...itemSelect}에 담겨져서 불러오게 된다.
        setIsClick(true); //클릭여부
    }

    return (
        <div>
            <MovieContainer>
                <MovieTitle>액션</MovieTitle>
                <Swiper
                    spaceBetween={10} //슬라이드와 슬라이드 사이 여백(gap)
                    slidesPerView={5} //한번에 보여질 슬라이드 아이템의 갯수
                    slidesPerGroup={5} //슬라이드 이동시 한번에 움직일 슬라이드 아이템의 갯수
                    loop //무한 반복
                    modules={[Navigation, Pagination]} //모듈 적용, 가져오기 -> import,css 따로 가져와야 함
                    navigation //모듈 실제 적용. 가져온 navigation 실제로 적용
                    pagination //모듈 실제 적용
                >
                    <MovieWrapper>
                        {/*actionData의result가 있고 actionData.results를 map으로 el,index를 받아서 배열로 뿌린다. <MovieItem>가 div가 되고 */}
                        {actionData.results && actionData.results.map((el,index)=>(
                            <SwiperSlide key={index}>
                                <MovieCard 
                                    movie={el} 
                                    genreText={getGenreText(el.genre_ids)}
                                    onClick = {movieClickEvent}
                                />{/*MovieCard에 moive와 genreText를 넘겨준다.*/}

                                {/*  MovieCard에 복붙
                                <MovieItem onClick={()=>overViewEvent(el,index)}> overViewEvent실행되면 OverView컴포넌트 실행(클릭할때마다 영화정보들이 계속 달라지는 박스보여줌 - 페이지 넘어가는거X)
                                    <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} /> 
                                </MovieItem> -> 안에 재생,찜같은 버튼, 장르 등 나와야할 게 많기 때문에 MovieCard 컴포넌트로 분리한다.  */}
                            </SwiperSlide>
                        ))}
                    </MovieWrapper>
                </Swiper>
            </MovieContainer>
            {/* 여기에 실행한 이유(OverView) : 그래야 영역 전체에서 진행함 */}
            {/*isClick && <Overview movie={isClick}  setIsClick={overViewClose}/> */}
            {isClick && ( 
                // OverViewWrapper 맨처음에 보이면 안됨 ->
                <OverViewWrapper isVisible={!!itemSelect}>
                    <OverView {...itemSelect} setIsClick={() => setIsClick(false)}/>
                </OverViewWrapper>
            )}
            {/* {isClick && <OverView movie={isClick} : 클릭한 요소에 정보값을 넘겨주는 거 필요 -> 클릭해서 overview활성화 시키면 그 안에 넘어오는 값들 있어야 함 그래야 Overview페이지 안에 정보가 하나씩 들어옴
            // isClick하면 OverView엔 movie란 값을 넘긴다(isClick한 요소에 영화의 값 다 담겨 있음->그 정보들을 Overview에 넘겨준다.),
            setIsClick은 overViewClose를 넘겨준다.
            */}
        </div>
    )
}

export default Action

const MovieContainer = styled.div`
    margin-bottom: 50px;
    position: relative;
    box-sizing: border-box;
`

const MovieTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: #ffffff;
`

const MovieWrapper = styled.div`
    height: 200px;
`

const OverViewWrapper = styled.div`
//맨처음에 보이면 안됨 : display : props로 전달시켜줘, porps의 isVisible을 받아와서(받아온 isVisible OverViewWrapper isVisible={!!itemSelect} 이거) 맞으면 block 아니면 none
    display: ${props => [props.isVisible ? 'block' : 'none']};
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
`