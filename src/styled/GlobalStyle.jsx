import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
    http://meyerweb.com/eric/tools/css/reset/ 
    License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    /* font: inherit; */
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
    display: block;
    }
    body {
    line-height: 1;
    overflow-x: hidden;//기본값으로 overflow-x만 잡아준다. 가로축은 볼 필요 없기 때문에 hidden으로
    }
    ol, ul {
    list-style: none;
    }
    blockquote, q {
    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    a{
    text-decoration: none;
    }
    img{
    display: block;
    width: 100%;
    }
    //reset파일 복붙

    //버튼,input은 reset파일에 없어서 따로 추가해줌
    button{
        border: none;
        background: transparent;
        cursor: pointer;
    }
    input{
        background: transparent;
        border : none;
    }
    body, html{
        background: #000000;
        
        &.no-scroll{
            overflow-y: hidden; //클래스에 no-scroll일 경우 overflow-y축 hidden으로 한다. 조건문에 맞춰 스크롤을 넣었다뺐다 할 수 있음
        }
    }
`

export default GlobalStyle;