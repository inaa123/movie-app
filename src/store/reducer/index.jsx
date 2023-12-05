/*
redux
전역상태 관리할 것

설치
yarn add react-redux
yarn add redux
yarn add redux-thunk
package.json에서 react-redux와 redux확인

redux는 프로그래밍에서 redux를 사용하기 위해 설치하는 라이브러리이며,
react-redux는 리액트에거 redux를 사용하기 또 다른 라이브러리이다.

//react-redux와 redux 둘 다 설치한 이유
//redux: 기본 컴포넌트, 기본 라이브러리
//react-redux : redux를 리액트에서 사용할 수 있도록 

redux는 
전역 상태 관리 라이브러리다.
리액트는 변경되는 값들을 보통 useState로 지정해서 관리를 한다.
보통 관리해야할 상태 값이 적은 경우 state로 관리할 수 있지만, 컴포넌트 끼리 공유할 상태값이 서로 달라서 엉키게 되면 state는 한계점이 명확해진다.
props로 상태값을 관리하면 가독성이 떨어지며, 유지보수에 어려움이 있다.(props는 변경할 수 없고, 참조만 가능하다)

이러한 state의 단점을 보완해서 하나의 공간에 데이터들을(사용할 데이터들) 다 모아 두고 전역으로 상태를 관리하는 ....

redux는 store라는 상태 저장소를 사용하며, 이 store에서 관리되는 상태값들은 일반적으로 꺼내오거나 변경은 불가능 하다.(상태값의 안전성 때문)
store에서는 자바스크립트의 객체 형태로 저장된다.

redux에서는 
action -> dispatch -> reducer -> store순으로 데이터가 진행이 된다. (action을 하고 dispatch ....)

action : 상태를 변경하려는 객체
dispatch : store에서 action에 전달하기 위해서 제공하는 하나의 방법
변경될 내용이 전달되면 reducer가 코드를 처리하고 없데이트 한다.
이런 방식으로 redux가 진행된다.
*/

import { combineReducers } from "redux";
import {FETCH_ACTION_MOVIES, FETCH_COMEDY_MOVIES} from '../';  // '../'이랑 '../index 같은 것(store안에 파일은 하나뿐?)

//장르 하나마다 const로 만든다. state는 상태값 : 객체가 들어간다.action은 상태를 변경하려는 객체다.
const actionMovieReducer = (state = [], action) =>{
    switch(action.type){
        case FETCH_ACTION_MOVIES : 
            return {
                ...state,
                movies : action.data 
            };
        default :  //default는 어떨때 넣어야 하는가?
            return state;
    }
}

const comdeyMovieReducer = (state = [], action) =>{
    switch(action.type){
        case FETCH_COMEDY_MOVIES : 
            return {
                ...state,
                movies : action.data 
            };
        default :  //default는 어떨때 넣어야 하는가?
            return state;
    }
}

const rootReducer = combineReducers({
    action : actionMovieReducer, //rootReducer만 밖으로 빼내면 actionMovieReducer도 참조할 수 있다.
    comedy : comdeyMovieReducer,
})//combineReducers : 여러 개의 reducer를 하나의 store에서 실행할 수 있도록 해주는 메서드다.
//장르마다 불러올 reducer가 다르기 때문에 한 번에 관리할 수 있는 combineReducers를 사용한다.(참조해야 할 ㅇㅇ가 다르다.)

export default rootReducer;

