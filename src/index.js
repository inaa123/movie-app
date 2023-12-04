import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styled/GlobalStyle';
import Main from './pages/Main';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MainVideos from './components/MainVideos';
import MovieList from './components/MovieList';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import rootReducer from './store/reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main />,
    errorElement : <NotFound />,
    children : [ //children은 path를 기준으로 뒤에 붙는 주소를 말한다.
      /* children
      중첩 라우터를 clidren으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를 기준으로 잡힌다.
      내부에 children으로 작성하게 되면 중첩되는 url은 생략할 수 있다.
      */
      //{path : ''}
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    {/* <App /> */}
    {/* <Main /> */}
    <MainVideos />
    <Provider store={store}> {/*왜 provider로 감싸야하는가? */}
      <MovieList />
    </Provider>

    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
