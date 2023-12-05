//클릭할때마다 영화에 대한 정보가 달라지는 박스가 보여질 것

import React from 'react'
import styled from 'styled-components'

function OverView() {
    return (
        <HoverContainer> {/*전체 투명한(opacity) 배경*/}
            {/*받아온 영화의 정보, video img등 가 들어가야함 */}
            <HoverWrapper> {/*영화 상세정보 박스 */}

            </HoverWrapper>
            
        </HoverContainer>
    )
}

export default OverView

const HoverContainer = styled.div`
    width: 100vw;
    /* height: 100vh; */
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto; //스크롤 생기면 아래로 생기도록
    z-index: 999;
    padding: 50px 0px;
`

const HoverWrapper = styled.div`
    width: 50%;
    height: auto;
    background: pink;
    position: relative;
    top: 50%;
    left: 50%;
    transform : translate(-50%, -50%);
`
