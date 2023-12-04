import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';

function Search() {
    const [visible, setVisible] = useState(false) //input창의 기본 속성 값 지정. 버튼 클릭하면 setVisible로 보이도록 바꿀 수 있음
    const [showClearBtn, setShowClearBtn] = useState(''); 
    //검색어의 입력 여부를 보기 위해서 만든 상태 변수 state 
    const [text, setText] = useState('') //검색어의 텍스트를 받아 올 상태 state (onClear이벤트 clearBtn 클릭하면 text비우기)

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
                        }}>
                    </input>
                )}
                
                {showClearBtn && ( //showClearBtn을 조건을 만족하면 버튼생기게
                    <button className='clear-btn' onClick={onClear}><MdClear /></button>
                )}
                
            </SearchForm>
        </>
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
