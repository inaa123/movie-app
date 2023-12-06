import axios from 'axios'; //api의 axios아님! 여기서 axios는 서버를 의미함! 실제 데이터는 tmdb에서 끌어와야 함.
import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';

function Search() {
    const [text, setText] = useState('') //검색어의 텍스트를 받아 올 상태 state (onClear이벤트 clearBtn 클릭하면 text비우기)
    const [visible, setVisible] = useState(false) //input창의 기본 속성 값 지정. 버튼 클릭하면 setVisible로 보이도록 바꿀 수 있음
    const [showClearBtn, setShowClearBtn] = useState(''); 
    //검색어의 입력 여부를 보기 위해서 만든 상태 변수 state 
   
    const [list, setList] = useState(false) //검색리시트 있는지 여부 리스트가 있는지 없는지 체크해줌 
    const [movieList, setMovieList] = useState([]); //검색 결과 리스트를 출력해줄지 여부. 맨처음 비어있다가 list배열을 받아오면 됨
    
    let data = []; //영화 리스트가 들어올 변수다. 상태변수값이 아닌 계속 변해야 되기 때문에 let으로 선언함
    const API_KEY = '82776dd4e021405937c471b1f995902b';
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&include_adult=false&language=ko-KR&page=1`;

    const onToggleEvent = (e) => {
        e.preventDefault();

        setVisible((prev) => !prev) //prev는 이전 상태값으로 false->true로 true->false로 반대값줌
    }

    //리액트에 클릭이벤트, 등 
    const onClear = (e) => {
        e.preventDefault();
        setText('');
        setShowClearBtn(false)
    }

    const fetch = async () => {
        const res = await axios.get(BASE_URL); //axios에서 BASE_URL을 가져온다.
        data = res.data.results || [];
        setMovieList(data); //movieList에 data를 담아준다.
        //console.log(data);
    }
    return (
        <>
            <SearchForm visible={`${visible}`} className={visible ? 'on' : null}>
                {/* 리액트에서 null은 값을 비운다는 의미이기도 하다. */}
                {/* visible왜 받아온 거지? , visible이 트루면 className에 on을 주고 아니면 null */}
                <button className='search-btn' onClick={onToggleEvent}><BiSearch /></button>
                {visible && ( //visible일 때만 input이 생기도록
                    <input type='text' 
                        placeholder='검색어를 입력하세요'
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                            setShowClearBtn(e.target.value.trim() !== '') //input에 value값이 있으면 clearBtn이
                            fetch(setMovieList());
                            setList(true)
                        }}>
                    </input>
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

const List = (props) => {
    const {backdrop_path, title} = props.props;
    const imgUrl = backdrop_path;
    return (
        <div className='listItem'>
            <img src={`https://image.tmdb.org/3/t/p/original/${imgUrl}`} />
        </div>
    )
}

export default Search

const SearchForm = styled.form`
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    transition: 500ms;
    width: 30px;
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
    background: black;
    z-index: -1;
    padding : 100px;
    box-sizing: border-box;
    overflow: scroll;
    display: none;
    &.on{
        display: block;
    }
    .searchMovie{
        width: 100%;
        height: 100%;
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
                img{
                    width: 350px;
                }
            }
        }
    }
`
