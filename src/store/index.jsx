//보통 폴더에 index파일이 있으면 경로를 잡을 때 컴포넌트명 따로 지정하지 않고 폴더명만 잡아도 index가 기본 경로로 적용이 된다.
import axios from "axios";

export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES';
export const FETCH_COMEDY_MOVIES = 'FETCH_COMDEY_MOVIES';

//src > api > axios.jsx에 있는 거 복붙
const API_KEY = '82776dd4e021405937c471b1f995902b';
const BASE_URL = 'https://api.themoviedb.org/3';

//액션
export const fetchActionData = (data) => { //data를 reducer에 넘겨준다. reducer/index에 data를 전달해 줄 것
    return {
        type : FETCH_ACTION_MOVIES,
        data
    }
}
export const fetchActionMovies = () => {
    return (dispatch) => {
        //dispatch : 외부에서 데이터를 가져올 때 사용하는 reducer의 기능이다. useState의 대체다. (임의로 만든거 x)
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)//tmdb API참조 DISCOVER - Movie 무비에 대한 정보를 가져오도록
        // 가져올 것 (movie리스트에서 받아 온 것(아이디값) 아이디값에 해당하는 장르 리스트들을 뽑아 올 수 있다. 28 -> 액션)
        .then((res) => {
            dispatch(fetchActionData(res.data))
            //then => axios에서 콜백함수를 대체하는 return문과 같은 구문이다. (axios.get을 만나서 then구문 출력,반환 해라)
        })
    }
}

//코미디
export const fetchComedyData = (data) => { //data를 reducer에 넘겨준다.
    return {
        type : FETCH_COMEDY_MOVIES,
        data
    }
}
export const fetchComedyMovies = () => {
    return (dispatch) => {
        //dispatch : 외부에서 데이터를 가져올 때 사용하는 reducer의 기능이다. useState의 대체다. (임의로 만든거 x)
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`)// 가져올 것 (movie리스트에서 받아 온 것(아이디값) 아이디값에 해당하는 장르를 뽑아 올 수 있다. 28 -> 액션)
        .then((res) => {
            dispatch(fetchComedyData(res.data))
            //then => axios에서 콜백함수를 대체하는 return문과 같은 구문이다. 
        })
    }
}

/*


*/