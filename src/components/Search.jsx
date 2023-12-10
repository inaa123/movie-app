import axios from 'axios'; //api의 axios아님! 여기서 axios는 서버를 의미함! 실제 데이터는 tmdb에서 끌어와야 함.
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';
import MovieCard from './MovieCard';
import { fetchGenres } from '../api/api';

function Search() {
    const [text, setText] = useState('') //검색어의 텍스트를 받아 올 상태 state (onClear이벤트 clearBtn 클릭하면 text비우기)
    const [visible, setVisible] = useState(false) //input창의 기본 속성 값 지정(false면 안보임). 버튼 클릭하면 setVisible 값을 true로 바꾸고 보이도록 바꿀 수 있음 ()
    const [showClearBtn, setShowClearBtn] = useState(''); 
    //검색어의 입력 여부를 보기 위해서 만든 상태 변수 state. 
   
    const [list, setList] = useState(false) //검색리스트 있는지 여부 리스트가 있는지 없는지 체크해줌 
    const [movieList, setMovieList] = useState([]); //검색 결과 리스트를 출력해줄지 여부. 맨처음 비어있다가 list배열을 받아오면 됨
    const searchRef = useRef(); //searchRef는 useRef()로 받아온다.


    let data = []; //영화 리스트가 들어올 변수 다. 상태변수값이 아닌 계속 변해야 되기 때문에 let으로 선언함
    const API_KEY = '82776dd4e021405937c471b1f995902b';
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&include_adult=false&language=ko-KR&page=1`;

    const onToggleEvent = (e) => {
        e.preventDefault(); //기본이벤트 없애고
        //setVisible의 값을 바꾼다. 이벤트가 발생하는 버튼은 반대값 줘야함(false->true로 true->false)
        setVisible((prev) => !prev) //prev는 이전 상태값으로 반대값 줌(false->true로 true->false로)
    }

    //리액트에 클릭이벤트, 등 
    const onClear = (e) => {
        e.preventDefault();
        setText(''); //검색창 텍스트 없앰
        setShowClearBtn(false) //버튼 없앰
        setList(false);
        setMovieList([]);
        //moveList와 list의 값도 초기값으로 돌려줘야 함
    }

    const fetch = async () => {
        const res = await axios.get(BASE_URL); //axios에서 BASE_URL을 가져온다.
        data = res.data.results || [];
        setMovieList(data); //movieList에 data를 담아준다.
        //console.log(data);
    }

    const inputChange = (e) => {
        setText(e.target.value)
        setShowClearBtn(e.target.value.trim() !== '') //input에 value값이 있으면 clearBtn이
        setList(true);
        //e.target.value.trim() : 텍스트가 있는지 없는지 검사
        //trim()에서 문자가 있는지 없는지 여부를 판단!
        if(e.target.value.trim()){ //텍스트가 있으면
            fetch(setMovieList()); //검색한 내용을 setMovieList에 담고,
            setList(true); //setList도 남겨야함(true)
        }else{ //텍스트를 지우거나 없으면
            setMovieList([]); 
            setList(false);
            ///moveList와 list의 값도 초기값으로 돌려줘야 함
        }
    }
    /*
    리스트가 있을 때엔 document.body에 no-scroll 클래스를 적용한다.
    없을 때에는 no-scroll클래스를 remove해준다.

    기본값은 no-scroll remove값이다.
    (상태값이 바뀜 useEffect로 설정)
    */
    useEffect(() => {
        //조건문: 리스트가 없고 있고
        if(list){ //list가 true면(있으면)
            document.body.classList.add('no-scroll')
        }else{ //list가 false면
            document.body.classList.remove('no-scroll');
        }
        return () =>{ //위의 코드들이 남아있기 때문에 리턴시켜주는게 좋음
            document.body.classList.remove('no-scroll');
        }
    },[list])//list가 없데이트 될 때만

    //텍스트 없을때 검색창 외 다른곳 클릭하면 검색창 닫히기
    useEffect(() => {
        //서치는 장르 구분하지 않는다. text가 들어갈 때만 text에대한 장르를 받아오면 되기때문에 useEffect안에 작성
        const fetchSearchGenres = async() => {
            try{
                const genres = await fetchGenres();
            }catch(error){
                console.error(error);
            }
        }
        

        
        //이벤트가 들어가는 곳 특정할 수 없음. -> 클릭한 곳에서 이벤트가 일어났는지 아닌지 봐야한다.(ref로 전달)
        const clickSideCloseEvent = (e) => {
            // console.log(searchRef.current)
            //console.log(searchRef.current.contains(e.target));
            if(searchRef.current && !searchRef.current.contains(e.target) && !text){ //searchRef.current:내가 선택한 요소, searchRef.current.contains(e.target):내가 클릭한 애가 target이 아니면, !text: 텍스트도 없어야함
                setVisible(false);
            }
        }
        document.addEventListener('mousedown', clickSideCloseEvent);//이때 실행
        fetchSearchGenres();

        //useEffect에서 return문은 리셋시키는 용도로 쓰이기도 한다.
        return () => { //위에 한번 실행하고 나서 return으로 이벤트를 없앤다. 그래야지 텍스트가 있는지 없는지 다시 검사할 수 있음 (검색창에 텍스트 있는 경우 다른곳을 클릭해도 닫히지 않게 하기 위해 removeEventListener를 해준다.)
            document.removeEventListener('mousedown', clickSideCloseEvent) 
        }
    },[text]) //안에 text가 있을 때만 실행

    //엔터키 실행 막기(자동 submit막아줌)
    const enterPress = (e) => {
        // console.log(e.key) e.key : 내가 누른 키의 값을 알려줌
        if(e.key === 'Enter'){ //내가 누른 키의 값이 Enter이면 기본 이벤트 실행을 막아주기
            e.preventDefault();
        }
    }

    

    return (
        <>
            <SearchForm visible={`${visible}`} className={visible ? 'on' : null} ref={searchRef}> 
                {/* 리액트에서 null은 값을 비운다는 의미이기도 하다. */}
                {/* visible왜 받아온 거지? -> input창이 늘어났다 줄어들었다는 SearchForm 길이로 조절한다. visible의 값을 위에서 받아오는 ${visible}의 값으로 하여 (ture,false)를 보내준다.*/}
                {/* visible이 트루면 className에 on을 주고 아니면 null */}
                {/* ref={searchRef} , ref값에 searchRef로 지정 */}
                <button className='search-btn' onClick={onToggleEvent}><BiSearch /></button>
                {visible && ( //visible일 때만 input이 생기도록
                    <input type='text' 
                        placeholder='검색어를 입력하세요'
                        value={text}
                        onChange={inputChange} //텍스트 써지는거 자체를 이벤트로 받아옴(onChange)
                        onKeyPress={enterPress}
                    ></input>
                )}
                
                {showClearBtn && ( //showClearBtn을 조건을 만족하면 버튼생기게
                    <button className='clear-btn' onClick={onClear}><MdClear /></button>
                )}
                
            </SearchForm>

            <ResultContainer className={(list ? 'on' : '')}>
                <div className='searchMovie'>
                    <h3>{text}로 검색한 결과입니다.</h3>
                    {list ? (
                        <div className='listContainer'>
                            {movieList && movieList.map((el) => (
                                <List props = {el} key={el.id}/>
                            ))}
                        </div>
                    ) : (<p>결과물을 불러오는 중입니다...</p>)}
                </div>
            </ResultContainer>
        </>
    )
}

// <List props = {el} key={el.id}/>에서 불러오긴 하지만 실행되는건 const List = 부분이다. 정보들이 넘어오는 건 <img src~부분(실제 정보가 담긴 애)이다. 실행되는 애에 이미지 대신 movieCard를 넣어준다.
const List = (props) => {
    const {backdrop_path, title, genre_ids} = props.props;
    return (
        <div className='listItem'>
            {/* 검색리스트에서 이미지를 클릭하면 movieCard로 넘어가게? */}
            <MovieCard movie={props.props}/>
            {/*MovieCard에 backdrop_path, title, 이미지 값 들이 전달돼야 한다. 
            movie에 대한 정보는 props.props로 넘겨준다.*/}
            {/* <img src={`https://image.tmdb.org/3/t/p/original/${imgUrl}`} /> */}
        </div>
    )
}

export default Search

const SearchForm = styled.form`
    display: flex;
    position: fixed;
    top: 30px;
    right: 30px;
    transition: 500ms;
    width: 30px;
    z-index: 11;
    &.on{ //on이 들어오면
        border: solid 1px #ffffff;
        transition: 500ms;
        width: 240px;
        border-radius : 4px;
    }
    .search-btn{
        color: #ffffff;
        font-size: 30px;
        display: flex;
        align-items: center;
    }
    input{
        width: ${({visible}) => (visible ? '200px' : '0px')};
        color: #ffffff;
        opacity: ${({visible}) => (visible ? 1 : 0)}
    }
    .clear-btn{
        position: absolute;
        top: 0;
        right: 0;
        color: #ffffff;
        font-size: 24px;
        display: flex;
        align-items: center;
    }
`
const ResultContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    background: black;
    z-index: 10;
    padding : 100px;
    box-sizing: border-box;
    overflow: auto;
    display: none;
    &.on{
        display: block;
    }
    .searchMovie{
        width: 100%;
        //height: 100%; 검색리스트의 아래부분 영역 자동으로 받아올 수 있게 지움
        position: relative;
        top: 0;
        left: 0;
        h3{
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            text-align: center;
            margin-bottom: 24px;
        }
        .listContainer{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            .listItem{
                position: relative; //검색창에서 이미지 hover시 movieCard가 제자리에서 잘 나오게 하기 위해 position을 추가해줌. 
                img{
                    width: 350px;
                }
            }
        }
    }
`
