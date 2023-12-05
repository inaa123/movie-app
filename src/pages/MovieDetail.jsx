import axios from '../api/axios'; //axios는 axios가 아닌 api에 있는 axios를 가져온다.
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function MovieDetail() {
    //id에 해당하는 값을 가져와야한다.
    
    //(id를 만들어서 페이지를 만든 것 -> 아무 의미없는 id를 추출해서 따로 받은 id에 해당하는 것을 찾아서 다시 가져온다. )
    //경로를 구성하는 url에서 값을 추출할 것.
    const {movieId} = useParams(); //movieId는 useParams를 가져온다. useParams는 특정한 값을 추출할 때 사용한다.
    const [movie, setMovie] = useState({}); //{}하나가 아닌 여러개

    //MovieDetail페이지가 마운트가 되면 async function fetchData()를 실행한다.
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(`/movie/${movieId}`) //axios에서 movie안에 있는 movieId를 찾는다.
            setMovie(request.data);
        }
        fetchData()
    }, [movieId]) //movieId가 있을 때만
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
        </div>
    )
}

export default MovieDetail
