/*
axios
axios란 hook
node.js에서 백엔드와 통신하기 위해 만들어진 http 비동기 통신 라이브러리다.

설치
> yarn add axios 
- package.json에서 axios 설치 됐는지 확인

필요한 요소 가져오기 위해(backdrop_path,title, genre_ids 등등) axios파일에 기본 세팅을 잡은 것!!
 */
import axios from 'axios';

const API_KEY = '82776dd4e021405937c471b1f995902b'; // 계정마다 발급 받는 api키를 변수화 
//변수로 담는이유는 통신 요청할 때마다 계속 쓸 수 없기 때문에 변수에 담아서 사용한다.
//const API_KEY = 'cee5f6f0e9b3ebf1112510bfbf9dde48'

const BASE_URL = 'https://api.themoviedb.org/3'; //영화의 정보를 받아올 url의 공통 주소를
//기본 URL에서 받아오는 거에 다라 경로가 달라짐.

//axios초기화 해서 만들어 두고, 통신할 것을 새로 세팅해준다.
const instance = axios.create({
    baseURL : BASE_URL,
    params : {
        api_key : API_KEY,
        language : 'ko-KR' //출력을 할 때 기준이 되는 연어
    }
})

export default instance; //export 기본값은 instance

