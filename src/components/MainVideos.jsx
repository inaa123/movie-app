//axios와 request를 통해서 여기서 동영상을 출력 할 것

import React, { useEffect, useState } from 'react'
import request from '../api/request';
import axios from '../api/axios'; //그냥 'axios가 아닌 만든 jsx파일 import해야 함
import styled from 'styled-components';

function MainVideos() {
    const [movie, setMovie] = useState(null) //영화의 리스트가 있음을 반환(있으면 리스트 보여주고 없으면 출력X) //어떤 리스트를 받아올지 정하지 않았으니 비어있는값NULL을 기본값으로 설정
    const [videoKey, setVideoKey] = useState(null) //영화 동영상을 연결할 아이디를 반환한다.
    const [showImg, setShowImg] = useState(true) //맨 처음 썸네일 이미지를 보여줄 이미지 상태값, false면 이미지 안나옴


    useEffect(() => {
        fetchData(); //fetchData함수 실행. 로딩될 때 한번만!, [] : 최초 로딩시에만! 아니면 새로고침할 때마다 계속 받아와서 과부화됨
    },[])

    useEffect(() => {
        if(videoKey){
            changeVideo();  //[videoKey] 비디오키가 있을 때 changeVideo실행
        } 
    },[videoKey])//[videoKey] 비디오키가 있을 때 changeVideo실행

    const fetchData = async () => {
        //async는 비동기식으로 데이터에 접근하는 메서드다.

        //try - catch (try로 시도하다가 error가 나오면 error출력)
        try{ //통신하다 정상적인 데이터 뽑아내지 못할 수 있다.(외부에서 가져올 땐 변수많음)
            const res = await axios.get(request.fetchNowPlayMovie) //res : response의 약자, await : 기다려
            console.log(res.data.results)

            const movieId = res.data.results[
                Math.floor(Math.random() * res.data.results.length) //새로고침할때마다 랜덤으로 출력

            ].id;
            // console.log(movieId);

            const {data : movieDetail} = await axios.get(`movie/${movieId}`, {
                params : {append_to_response : 'videos'},
            })
            if(movieDetail.videos && movieDetail.videos.results.length > 0){
                setMovie(movieDetail)
                setVideoKey(movieDetail.videos.results[0].key)
                // console.log(movieDetail.videos.results)
                setTimeout(() => {
                    setShowImg(false)
                }, 2000)
            }
            
        }catch(error){
            console.error(error)
        }//에러 발생 시 오류를 출력하기 위해서 try - catch (try로 시도하다가 error가 나오면 error출력)
    }

    const changeVideo = () => {
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = ''; //이미지 영역 맨 처음에 비워뒀다 새 로딩 시 

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey}`; //youtube 기준으로 
        iframe.width = '100%'; //iframe의 영역값
        iframe.height = '100%';
        videoContainer.appendChild(iframe);
    }

    return (
        <>
        {showImg && movie && (
            <MainVideoImg img={movie.backdrop_path} />
        )}
            <MainVideoWrapper id='videoContainer'/>
            
        </>
    )
}

export default MainVideos

const MainVideoImg = styled.div`
    position: absolute;
    top : 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background: url(https://image.tmdb.org/t/p/original/${(props) => props.img}) no-repeat center center / cover;
`

const MainVideoWrapper = styled.div`
    width : 100%;
    height : 100vh;
`

