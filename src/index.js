import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MovieDetail from './pages/MovieDetail';
import App from './App';
/*
import 시에 {} 사용하는 것과 안하는 것의 차이
기능을 내보내기 하는 방법에 따라서 차이가 발생한다.

{}가 없는 import는 보통 export default로 내보내기 된 컴포넌트를 import할 때다.
{}를 사용해서 가져올 때에는 default가 아닌 하나의 컴포넌트에 여러개의 export가 되어 있는 경우 각각 가져오기 위해서 사용한다.
*/


const router = createBrowserRouter([ //경로 잡기
  {
    path : '/',
    element : <App />, //path '/'이면 App이 뜨게
    errorElement : <NotFound />, //다른 페이지로 넘어가게 되면(errorElement) NotFound들어가게 한다.
    children : [ //children은 path를 기준으로 뒤에 붙는 주소를 말한다.
      /* children
      중첩 라우터를 clidren으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를 기준으로 잡힌다.
      내부에 children으로 작성하게 되면 중첩되는 url은 생략할 수 있다.
      */
      //{path : ''}
    ]
  },
  {
    path : 'movie/:movieId', //path를 만든다. movie안에 movieId를 받아오는 path를 만든다. 여기서 :은 유동적인 값 -> 정해진값이 아닌 클릭했을 때마다  나오는 고유의 아이디 값을 받아서 링크에 쏴줘야한다. 그래야 링크에 내가 클릭한 정보의 값들이 나오게 됨
    element : <MovieDetail /> //element는 MovieDetail페이지를 열어준다.
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
