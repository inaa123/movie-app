import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchActionMovies } from '../store';

function Action() {
    const dispatch = useDispatch(); //생성된 action(아까 요청한 것)의 state에 접근한 것 index.jsx의 axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&width_genres=28`) -> reducer폴더의 index.jsx에서 ..state state값을 뽑아내고??? ->Action에 장르별 컴퍼넌트를 담는다..??

    useEffect(() => {
        dispatch(fetchActionMovies())
    }, [])

    console.log(fetchActionMovies())

    const actionData = useSelector((state) => state.action.movies, []) || []
    console.log(actionData.results)

    return (
        <div>
            
        </div>
    )
}

export default Action
