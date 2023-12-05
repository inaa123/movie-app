import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchActionMovies } from '../store';
import styled from 'styled-components';
import OverView from './OverView';
// import Swiper from 'swiper'; 자동 import될때 주의!! 이거 아님

//swiper
//yarn add swiper
import {Swiper, SwiperSlide} from 'swiper/react'; //스와이퍼 적용 import
//스크립트에서 swiper를 가져오면 가지고 있던 class명자동 적용됨. 마찬가지로 Swiper와 SwiperSlide엔 자동으로 class명이 들어가 있음
import {Navigation, Pagination} from 'swiper/modules'; //모듈 import
import 'swiper/css'; //스와이퍼 기본 css 적용 import
import 'swiper/css/navigation'; //스와이퍼 좌우 버튼 기본 css
import 'swiper/css/pagination'; //스와이퍼 도트 리스트 기본 css
import '../styled/swiperCustomCss.css';


function Action() {
    //클릭한걸 알려주기 위함. 뭘 클릭했는지. 어떤 인덱스를 클릭햇는지에 따라서 그 안의 정보들을 넘겨줘야 함. / useState(false) 일단 클릭 안한 상태니 false, 클릭하면 뭔가를 받아올 것
    const [isClick, setIsClick] =  useState(false);
    const dispatch = useDispatch(); //생성된 action(아까 요청한 것)의 state에 접근한 것 index.jsx의 axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&width_genres=28`) -> reducer폴더의 index.jsx에서 ..state state값을 뽑아내고??? ->Action에 장르별 컴퍼넌트를 담는다..??

    useEffect(() => {
        dispatch(fetchActionMovies())
    }, [])

    console.log(fetchActionMovies())

    const actionData = useSelector((state) => state.action.movies, []) || []
    //console.log(actionData.results) //actionData에 있던 results 출력
    //actionData.results에 object로 list들이 담겨져 있다.

    const overViewEvent = (el) => {
        setIsClick(el)
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
                    modules={[Navigation, Pagination]} //모듈 적용, 가져오기
                    navigation //모듈 실제 적용. 가져온 navigation 실제로 적용
                    pagination //모듈 실제 적용
                >
                    <MovieWrapper>
                        {/*actionData의result가 있고 actionData.results를 map으로 el,index를 받아서 배열로 뿌린다. <MovieItem>가 div가 되고 */}
                        {actionData.results && actionData.results.map((el,index)=>(
                            <SwiperSlide>
                                <MovieItem onClick={()=>overViewEvent(el,index)}>
                                    <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} />
                                </MovieItem>
                                {/*{isClick === index && (
                                    <OverView/>
                                )} */}
                            </SwiperSlide>
                        ))}
                    </MovieWrapper>
                </Swiper>
            </MovieContainer>
            {isClick && <OverView movie={isClick}/>}
            {/*isClick을 하게되면 Overview엔 movie란 데이터를 넘길 것, isClick한 요소에 영화에 대한 정보들이 다 담겨있음, 이 정보를 OverView에 넘겨준다.*/}
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

const MovieItem = styled.div`
    img{
        display: block;
        width: 100%;
    }
`