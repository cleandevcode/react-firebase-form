import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'
import 'bootstrap/dist/css/bootstrap.min.css';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBvAOM5ZsJ7MNIZNsWaN0hDuhQ46_bZ47I",
  authDomain: "studentmanagement-4ff86.firebaseapp.com",
  projectId: "studentmanagement-4ff86",
  storageBucket: "studentmanagement-4ff86.appspot.com",
  messagingSenderId: "1013280062799",
  appId: "1:1013280062799:web:6d3c127529196382dfd93a",
  measurementId: "G-KM93VBW9GR"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
