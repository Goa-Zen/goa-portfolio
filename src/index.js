import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore  as createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import reducers from "./reducers";
import reportWebVitals from './reportWebVitals';

import './index.css';
// import TodoApp from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

// import "./style/main.scss";

function main() {

  // const logger = store => next => action => {
  //   console.group(action.type)
  //   console.info('dispatching', action)
  //   let result = next(action)
  //   console.log('next state', store.getState())
  //   console.groupEnd(action.type)
  //   return result
  // }
  // let store = createStore(rootReducer);
  // const store = createStore(todoApp, undefined, applyMiddleware(logger));
  const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </Provider>

    );
    reportWebVitals();
}

document.addEventListener("DOMContentLoaded", main);

  // ReactDOM.render(
  //   <Provider store={createStoreWithMiddleware(reducers)}>
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </Provider>,
  //   document.querySelector(".root")
  // );



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './components/App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
