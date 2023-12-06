import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchComedyMovies } from '../store';
import styled from 'styled-components';
import OverView from './OverView';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules'; //모듈 import
import 'swiper/css'; //스와이퍼 기본 css 적용 import
import 'swiper/css/navigation'; //스와이퍼 좌우 버튼 기본 css
import 'swiper/css/pagination'; //스와이퍼 도트 리스트 기본 css
import '../styled/swiperCustomCss.css';


function Comedy() {

    const [isClick, setIsClick] =  useState(false);
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(fetchComedyMovies())
    }, [])

    //console.log(fetchComedyMovies())

    const actionData = useSelector((state) => state.comedy.movies, []) || []
    const overViewEvent = (el) => {
        setIsClick(el)
    }
    
    const overViewClose = () => {
        setIsClick(false); 
    }

    return (
        <div>
            <MovieContainer>
                <MovieTitle>코미디</MovieTitle>
                <Swiper
                    spaceBetween={10} //슬라이드와 슬라이드 사이 여백(gap)
                    slidesPerView={5} //한번에 보여질 슬라이드 아이템의 갯수
                    slidesPerGroup={5} //슬라이드 이동시 한번에 움직일 슬라이드 아이템의 갯수
                    loop //무한 반복
                    modules={[Navigation, Pagination]} //모듈 적용, 가져오기
                    navigation //모듈 실제 적용.
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
            {isClick && <OverView movie={isClick} setIsClick={overViewClose}/>}
            {/*isClick을 하게되면 Overview엔 movie란 데이터를 넘길 것, isClick한 요소에 영화에 대한 정보들이 다 담겨있음, 이 정보를 OverView에 넘겨준다.
            setIsClick은 overViewClose를 넘겨준다.
            */}
        </div>
    )
}

export default Comedy

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